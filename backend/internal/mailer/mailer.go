package mailer

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type ContactRequest struct {
	Name    string `json:"name"`
	Company string `json:"company"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

type ContactResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// HandleContact validates the form payload and sends an email via Resend.
func HandleContact(w http.ResponseWriter, r *http.Request) {
	log.Printf("[mailer] incoming request from %s", r.RemoteAddr)
	w.Header().Set("Content-Type", "application/json")

	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "Invalid request body.")
		return
	}

	if err := validate(req); err != nil {
		writeErr(w, http.StatusUnprocessableEntity, err.Error())
		return
	}

	if err := send(req); err != nil {
		log.Printf("[mailer] FAILED to send email from %s: %v", req.Email, err)
		writeErr(w, http.StatusInternalServerError, "Failed to send. Please try again later.")
		return
	}

	log.Printf("[mailer] sent — from %s <%s>", req.Name, req.Email)
	json.NewEncoder(w).Encode(ContactResponse{Success: true, Message: "Message sent successfully."})
}

// ── Validation ───────────────────────────────────────

func validate(r ContactRequest) error {
	if strings.TrimSpace(r.Name) == "" {
		return fmt.Errorf("name is required")
	}
	if len(r.Name) > 120 {
		return fmt.Errorf("name too long")
	}
	email := strings.TrimSpace(r.Email)
	if email == "" || !strings.Contains(email, "@") || !strings.Contains(email, ".") {
		return fmt.Errorf("valid email is required")
	}
	if strings.TrimSpace(r.Message) == "" {
		return fmt.Errorf("message is required")
	}
	if len(r.Message) > 5000 {
		return fmt.Errorf("message too long (max 5000 chars)")
	}
	return nil
}

// ── Resend ───────────────────────────────────────────

type resendPayload struct {
	From    string   `json:"from"`
	To      []string `json:"to"`
	ReplyTo string   `json:"reply_to"`
	Subject string   `json:"subject"`
	Html    string   `json:"html"`
}

func send(req ContactRequest) error {
	apiKey := os.Getenv("RESEND_API_KEY")
	toEmail := os.Getenv("CONTACT_TO_EMAIL")

	// Dev mode — just log
	if apiKey == "" || toEmail == "" {
		log.Printf("[mailer] DEV MODE — would send:\n  To: %s\n  Subject: %s\n  From: %s <%s>\n  Body: %s",
			toEmail, subject(req), req.Name, req.Email, req.Message)
		return nil
	}

	payload := resendPayload{
		From:    "Portfolio <onboarding@resend.dev>",
		To:      []string{toEmail},
		ReplyTo: req.Email,
		Subject: subject(req),
		Html:    buildHTML(req),
	}

	body, _ := json.Marshal(payload)
	client := &http.Client{Timeout: 10 * time.Second}

	httpReq, _ := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewReader(body))
	httpReq.Header.Set("Authorization", "Bearer "+apiKey)
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(httpReq)
	if err != nil {
		return fmt.Errorf("resend request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return fmt.Errorf("resend API error: status %d", resp.StatusCode)
	}
	return nil
}

func subject(req ContactRequest) string {
	s := strings.TrimSpace(req.Subject)
	if s == "" {
		s = "Portfolio Contact"
	}
	company := ""
	if strings.TrimSpace(req.Company) != "" {
		company = " @ " + req.Company
	}
	return fmt.Sprintf("[zeus.dev] %s — %s%s", s, req.Name, company)
}

func buildHTML(req ContactRequest) string {
	company := ""
	if req.Company != "" {
		company = fmt.Sprintf(`<tr><td style="color:#8a95a3;padding:6px 0;font-size:0.85rem;">Company</td><td style="padding:6px 0;font-size:0.85rem;">%s</td></tr>`, req.Company)
	}
	return fmt.Sprintf(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#080b0d;font-family:monospace;">
<div style="max-width:560px;margin:40px auto;border:1px solid rgba(0,255,140,0.2);background:#0c1014;">
  <div style="padding:20px 28px;border-bottom:1px solid rgba(0,255,140,0.15);background:linear-gradient(90deg,rgba(0,255,140,0.08),transparent);">
    <span style="color:#00ff8c;font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;">● New Contact — zeus.dev</span>
  </div>
  <div style="padding:28px;">
    <table style="width:100%%;border-collapse:collapse;color:#dde4ec;">
      <tr><td style="color:#8a95a3;padding:6px 0;font-size:0.85rem;width:100px;">Name</td><td style="padding:6px 0;font-size:0.85rem;">%s</td></tr>
      %s
      <tr><td style="color:#8a95a3;padding:6px 0;font-size:0.85rem;">Email</td><td style="padding:6px 0;font-size:0.85rem;"><a href="mailto:%s" style="color:#00e5ff;">%s</a></td></tr>
      <tr><td style="color:#8a95a3;padding:6px 0;font-size:0.85rem;">Subject</td><td style="padding:6px 0;font-size:0.85rem;">%s</td></tr>
    </table>
    <div style="margin-top:24px;padding:18px;background:#080b0d;border-left:2px solid #00ff8c;">
      <p style="color:#8a95a3;font-size:0.85rem;line-height:1.7;white-space:pre-wrap;margin:0;">%s</p>
    </div>
    <p style="margin-top:20px;font-size:0.7rem;color:#4e5b68;">Sent via zeus.dev portfolio · Reply directly to this email</p>
  </div>
</div>
</body></html>`,
		req.Name, company, req.Email, req.Email, req.Subject, req.Message)
}

func writeErr(w http.ResponseWriter, code int, msg string) {
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ContactResponse{Success: false, Message: msg})
}
