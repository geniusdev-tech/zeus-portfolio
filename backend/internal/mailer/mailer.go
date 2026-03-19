package mailer

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html"
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
	fromEmail := strings.TrimSpace(os.Getenv("EMAIL_FROM"))

	// Dev mode — just log
	if apiKey == "" || toEmail == "" {
		log.Printf("[mailer] DEV MODE — would send:\n  To: %s\n  Subject: %s\n  From: %s <%s>\n  Body: %s",
			toEmail, subject(req), req.Name, req.Email, req.Message)
		return nil
	}

	if fromEmail == "" {
		fromEmail = "Portfolio <onboarding@resend.dev>"
	}

	payload := resendPayload{
		From:    fromEmail,
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
	return fmt.Sprintf("[Zeus_] %s — %s%s", s, req.Name, company)
}

func buildHTML(req ContactRequest) string {
	name := html.EscapeString(req.Name)
	companyValue := html.EscapeString(req.Company)
	email := html.EscapeString(req.Email)
	subject := html.EscapeString(req.Subject)
	message := strings.ReplaceAll(html.EscapeString(req.Message), "\n", "<br>")

	company := ""
	if req.Company != "" {
		company = fmt.Sprintf(`<tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;width:120px;">Company</td><td style="padding:8px 0;font-size:0.85rem;color:#e5e7eb;">%s</td></tr>`, companyValue)
	}
	header := `<tr>
            <td style="padding:22px 30px; background:linear-gradient(90deg,#111827,#0f172a); border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="font-family:monospace; font-size:0.72rem; letter-spacing:0.22em; text-transform:uppercase; color:#34d399;">
                New Contact - Zeus_
              </div>
            </td>
          </tr>`

	animation := `<tr>
            <td style="padding:0 30px 0 30px;">
              <div style="height:4px; background:linear-gradient(90deg,#22c55e 0%%,#06b6d4 50%%,#22c55e 100%%); box-shadow:0 0 18px rgba(34,197,94,0.25);"></div>
            </td>
          </tr>`

	content := fmt.Sprintf(`
              <div style="font-family:Arial,sans-serif; color:#e5e7eb;">
                <h2 style="margin:0 0 18px 0; font-size:1.25rem; font-weight:600; color:#f9fafb;">Project Inquiry Received</h2>

                <table width="100%%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;width:120px;">Name</td><td style="padding:8px 0;font-size:0.85rem;color:#e5e7eb;">%s</td></tr>
                  %s
                  <tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;">Email</td><td style="padding:8px 0;font-size:0.85rem;color:#22d3ee;">%s</td></tr>
                  <tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;">Subject</td><td style="padding:8px 0;font-size:0.85rem;color:#e5e7eb;">%s</td></tr>
                </table>

                <div style="margin-top:24px; padding:18px 20px; background:#0b1220; border:1px solid rgba(255,255,255,0.06); border-left:3px solid #34d399; border-radius:10px;">
                  <div style="font-family:monospace; font-size:0.64rem; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin-bottom:10px;">
                    Message
                  </div>
                  <p style="margin:0; color:#d1d5db; font-size:0.92rem; line-height:1.8;">%s</p>
                </div>

                <p style="margin:18px 0 0 0; font-size:0.72rem; color:#6b7280;">
                  Sent via Zeus_ portfolio. Use your email client reply action to answer the sender via Reply-To.
                </p>
              </div>`,
		name, company, email, subject, message)

	return fmt.Sprintf(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="background:#0b0f1a; margin:0; padding:24px 0;">
    <table width="100%%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="width:100%%; max-width:600px; background:#111827; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.06);">
            %s
            %s
            <tr>
              <td style="padding:30px;">
                %s
              </td>
            </tr>
            <tr>
              <td style="text-align:center; padding:20px; color:#9ca3af; font-family:Arial,sans-serif; font-size:0.78rem;">
                &copy; Zeus Protocol
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`, header, animation, content)
}

func writeErr(w http.ResponseWriter, code int, msg string) {
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ContactResponse{Success: false, Message: msg})
}
