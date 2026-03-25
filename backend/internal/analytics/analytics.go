package analytics

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"
	"time"
)

const (
	defaultMPCollectEndpoint = "https://www.google-analytics.com/mp/collect"
	defaultMPDebugEndpoint   = "https://www.google-analytics.com/debug/mp/collect"
	maxResponseReadBytes      = 4 << 10
)

var eventNamePattern = regexp.MustCompile(`^[A-Za-z][A-Za-z0-9_]{0,39}$`)

type Request struct {
	MeasurementID      string `json:"measurement_id,omitempty"`
	ClientID           string `json:"client_id"`
	SessionID          string `json:"session_id,omitempty"`
	EventName          string `json:"event_name"`
	PageTitle          string `json:"page_title,omitempty"`
	PageLocation       string `json:"page_location,omitempty"`
	PageReferrer       string `json:"page_referrer,omitempty"`
	EngagementTimeMsec int64  `json:"engagement_time_msec,omitempty"`
}

type mpPayload struct {
	ClientID        string    `json:"client_id"`
	TimestampMicros int64     `json:"timestamp_micros,omitempty"`
	Events          []mpEvent `json:"events"`
}

type mpEvent struct {
	Name   string         `json:"name"`
	Params map[string]any `json:"params"`
}

type response struct {
	Success   bool   `json:"success"`
	Message   string `json:"message,omitempty"`
	Forwarded bool   `json:"forwarded,omitempty"`
}

func HandleAnalytics(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		writeJSON(w, http.StatusMethodNotAllowed, response{
			Success: false,
			Message: "Method not allowed",
		})
		return
	}

	var req Request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, response{
			Success: false,
			Message: "Invalid analytics payload",
		})
		return
	}

	req.MeasurementID = strings.TrimSpace(req.MeasurementID)
	req.ClientID = strings.TrimSpace(req.ClientID)
	req.SessionID = strings.TrimSpace(req.SessionID)
	req.EventName = strings.TrimSpace(req.EventName)
	req.PageTitle = strings.TrimSpace(req.PageTitle)
	req.PageLocation = strings.TrimSpace(req.PageLocation)
	req.PageReferrer = strings.TrimSpace(req.PageReferrer)

	if req.MeasurementID == "" {
		req.MeasurementID = strings.TrimSpace(os.Getenv("GA4_MEASUREMENT_ID"))
	}

	apiSecret := strings.TrimSpace(os.Getenv("GA4_API_SECRET"))
	if req.MeasurementID == "" || apiSecret == "" {
		writeJSON(w, http.StatusServiceUnavailable, response{
			Success: false,
			Message: "GA4 not configured",
		})
		return
	}

	if req.ClientID == "" {
		writeJSON(w, http.StatusBadRequest, response{
			Success: false,
			Message: "client_id is required",
		})
		return
	}

	if !eventNamePattern.MatchString(req.EventName) {
		writeJSON(w, http.StatusBadRequest, response{
			Success: false,
			Message: "Invalid event name",
		})
		return
	}

	if req.EngagementTimeMsec <= 0 {
		req.EngagementTimeMsec = 1000
	}

	params := map[string]any{
		"engagement_time_msec": req.EngagementTimeMsec,
	}
	if req.SessionID != "" {
		params["session_id"] = req.SessionID
	}
	if req.PageTitle != "" {
		params["page_title"] = req.PageTitle
	}
	if req.PageLocation != "" {
		params["page_location"] = req.PageLocation
	}
	if req.PageReferrer != "" {
		params["page_referrer"] = req.PageReferrer
	}

	payload := mpPayload{
		ClientID:        req.ClientID,
		TimestampMicros: time.Now().UnixMicro(),
		Events: []mpEvent{
			{
				Name:   req.EventName,
				Params: params,
			},
		},
	}

	endpoint := strings.TrimSpace(os.Getenv("GA4_MP_ENDPOINT"))
	if endpoint == "" {
		endpoint = defaultMPCollectEndpoint
	}
	if strings.EqualFold(os.Getenv("GA4_DEBUG"), "true") {
		endpoint = defaultMPDebugEndpoint
	}

	targetURL, err := buildEndpointURL(endpoint, req.MeasurementID, apiSecret)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, response{
			Success: false,
			Message: "Failed to prepare analytics request",
		})
		return
	}

	body, err := json.Marshal(payload)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, response{
			Success: false,
			Message: "Failed to encode analytics payload",
		})
		return
	}

	httpReq, err := http.NewRequestWithContext(r.Context(), http.MethodPost, targetURL, bytes.NewReader(body))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, response{
			Success: false,
			Message: "Failed to create analytics request",
		})
		return
	}
	httpReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(httpReq)
	if err != nil {
		log.Printf("[analytics] forward error: %v", err)
		writeJSON(w, http.StatusBadGateway, response{
			Success: false,
			Message: "Failed to forward analytics event",
		})
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(io.LimitReader(resp.Body, maxResponseReadBytes))
	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		log.Printf("[analytics] ga4 status=%d body=%s", resp.StatusCode, strings.TrimSpace(string(respBody)))
		writeJSON(w, http.StatusBadGateway, response{
			Success: false,
			Message: "GA4 rejected the analytics event",
		})
		return
	}

	if strings.EqualFold(os.Getenv("GA4_DEBUG"), "true") {
		log.Printf("[analytics] debug response: %s", strings.TrimSpace(string(respBody)))
	}

	writeJSON(w, http.StatusOK, response{
		Success:   true,
		Forwarded: true,
	})
}

func buildEndpointURL(endpoint, measurementID, apiSecret string) (string, error) {
	u, err := url.Parse(endpoint)
	if err != nil {
		return "", err
	}

	query := u.Query()
	query.Set("measurement_id", measurementID)
	query.Set("api_secret", apiSecret)
	u.RawQuery = query.Encode()
	return u.String(), nil
}

func writeJSON(w http.ResponseWriter, status int, payload response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
