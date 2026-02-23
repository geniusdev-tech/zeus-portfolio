package github

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

// ── GitHub API types ─────────────────────────────────

type ghEvent struct {
	ID        string    `json:"id"`
	Type      string    `json:"type"`
	CreatedAt time.Time `json:"created_at"`
	Repo      struct {
		Name string `json:"name"`
	} `json:"repo"`
	Payload json.RawMessage `json:"payload"`
}

type ghPushPayload struct {
	Commits []struct {
		Message string `json:"message"`
	} `json:"commits"`
	Ref string `json:"ref"`
}

type ghPRPayload struct {
	Action      string `json:"action"`
	PullRequest struct {
		Title string `json:"title"`
	} `json:"pull_request"`
}

type ghIssuePayload struct {
	Action string `json:"action"`
	Issue  struct {
		Title string `json:"title"`
	} `json:"issue"`
}

// ── Response type ────────────────────────────────────

type ActivityEvent struct {
	ID          string    `json:"id"`
	Type        string    `json:"type"`
	Icon        string    `json:"icon"`
	Description string    `json:"description"`
	Repo        string    `json:"repo"`
	RepoURL     string    `json:"repo_url"`
	CreatedAt   time.Time `json:"created_at"`
	TimeAgo     string    `json:"time_ago"`
}

type ActivityResponse struct {
	Username string          `json:"username"`
	Events   []ActivityEvent `json:"events"`
	Total    int             `json:"total"`
}

// ── Handler ──────────────────────────────────────────

func HandleActivity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=60") // cache 60s

	username := os.Getenv("GITHUB_USERNAME")
	if username == "" {
		username = r.URL.Query().Get("user")
	}
	if username == "" {
		http.Error(w, `{"error":"GITHUB_USERNAME not configured"}`, http.StatusServiceUnavailable)
		return
	}

	events, err := fetchEvents(username)
	if err != nil {
		log.Printf("[github] fetch error: %v", err)
		http.Error(w, `{"error":"Failed to fetch GitHub activity"}`, http.StatusBadGateway)
		return
	}

	resp := ActivityResponse{
		Username: username,
		Events:   events,
		Total:    len(events),
	}

	json.NewEncoder(w).Encode(resp)
}

// ── GitHub fetch ─────────────────────────────────────

func fetchEvents(username string) ([]ActivityEvent, error) {
	url := fmt.Sprintf("https://api.github.com/users/%s/events/public?per_page=30", username)

	client := &http.Client{Timeout: 8 * time.Second}
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")
	req.Header.Set("User-Agent", "zeus-portfolio-backend/1.0")

	// Use token if available (higher rate limit: 5000 req/hour vs 60)
	if token := os.Getenv("GITHUB_TOKEN"); token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == 404 {
		return nil, fmt.Errorf("github user not found: %s", username)
	}
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("github API error: status %d", resp.StatusCode)
	}

	var raw []ghEvent
	if err := json.NewDecoder(resp.Body).Decode(&raw); err != nil {
		return nil, fmt.Errorf("decode error: %w", err)
	}

	return parseEvents(raw, username), nil
}

// ── Event parsing ─────────────────────────────────────

func parseEvents(raw []ghEvent, username string) []ActivityEvent {
	out := make([]ActivityEvent, 0, len(raw))

	for _, e := range raw {
		ev := ActivityEvent{
			ID:        e.ID,
			Type:      e.Type,
			Repo:      e.Repo.Name,
			RepoURL:   "https://github.com/" + e.Repo.Name,
			CreatedAt: e.CreatedAt,
			TimeAgo:   timeAgo(e.CreatedAt),
		}

		switch e.Type {
		case "PushEvent":
			ev.Icon = "push"
			var p ghPushPayload
			if err := json.Unmarshal(e.Payload, &p); err == nil && len(p.Commits) > 0 {
				msg := p.Commits[0].Message
				if len(msg) > 72 {
					msg = msg[:69] + "..."
				}
				branch := shortRef(p.Ref)
				ev.Description = fmt.Sprintf("Pushed to %s: %s", branch, msg)
			} else {
				ev.Description = "Pushed commits"
			}

		case "CreateEvent":
			ev.Icon = "create"
			var p struct {
				RefType string `json:"ref_type"`
				Ref     string `json:"ref"`
			}
			if err := json.Unmarshal(e.Payload, &p); err == nil {
				ev.Description = fmt.Sprintf("Created %s %s", p.RefType, p.Ref)
			}

		case "PullRequestEvent":
			ev.Icon = "pr"
			var p ghPRPayload
			if err := json.Unmarshal(e.Payload, &p); err == nil {
				ev.Description = fmt.Sprintf("PR %s: %s", p.Action, p.PullRequest.Title)
			}

		case "IssuesEvent":
			ev.Icon = "issue"
			var p ghIssuePayload
			if err := json.Unmarshal(e.Payload, &p); err == nil {
				ev.Description = fmt.Sprintf("Issue %s: %s", p.Action, p.Issue.Title)
			}

		case "WatchEvent":
			ev.Icon = "star"
			ev.Description = "Starred repository"

		case "ForkEvent":
			ev.Icon = "fork"
			ev.Description = "Forked repository"

		case "DeleteEvent":
			ev.Icon = "delete"
			var p struct {
				RefType string `json:"ref_type"`
				Ref     string `json:"ref"`
			}
			if err := json.Unmarshal(e.Payload, &p); err == nil {
				ev.Description = fmt.Sprintf("Deleted %s %s", p.RefType, p.Ref)
			}

		case "ReleaseEvent":
			ev.Icon = "release"
			var p struct {
				Action  string `json:"action"`
				Release struct {
					TagName string `json:"tag_name"`
					Name    string `json:"name"`
				} `json:"release"`
			}
			if err := json.Unmarshal(e.Payload, &p); err == nil {
				ev.Description = fmt.Sprintf("Released %s — %s", p.Release.TagName, p.Release.Name)
			}

		default:
			ev.Icon = "activity"
			ev.Description = friendlyType(e.Type)
		}

		out = append(out, ev)
	}

	return out
}

// ── Helpers ──────────────────────────────────────────

func shortRef(ref string) string {
	// refs/heads/main -> main
	parts := splitRef(ref)
	if len(parts) > 0 {
		return parts[len(parts)-1]
	}
	return ref
}

func splitRef(ref string) []string {
	out := []string{}
	cur := ""
	for _, c := range ref {
		if c == '/' {
			if cur != "" {
				out = append(out, cur)
				cur = ""
			}
		} else {
			cur += string(c)
		}
	}
	if cur != "" {
		out = append(out, cur)
	}
	return out
}

func friendlyType(t string) string {
	m := map[string]string{
		"CommitCommentEvent":            "Commented on commit",
		"GollumEvent":                   "Updated wiki",
		"MemberEvent":                   "Member change",
		"PublicEvent":                   "Made repo public",
		"PullRequestReviewEvent":        "Reviewed pull request",
		"PullRequestReviewCommentEvent": "Commented on PR",
		"IssueCommentEvent":             "Commented on issue",
	}
	if v, ok := m[t]; ok {
		return v
	}
	return t
}

func timeAgo(t time.Time) string {
	d := time.Since(t)
	switch {
	case d < time.Minute:
		return "just now"
	case d < time.Hour:
		m := int(d.Minutes())
		if m == 1 {
			return "1 minute ago"
		}
		return fmt.Sprintf("%d minutes ago", m)
	case d < 24*time.Hour:
		h := int(d.Hours())
		if h == 1 {
			return "1 hour ago"
		}
		return fmt.Sprintf("%d hours ago", h)
	case d < 7*24*time.Hour:
		day := int(d.Hours() / 24)
		if day == 1 {
			return "yesterday"
		}
		return fmt.Sprintf("%d days ago", day)
	default:
		return t.Format("Jan 2")
	}
}
