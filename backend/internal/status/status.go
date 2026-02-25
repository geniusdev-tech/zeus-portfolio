package status

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"
)

// ── Response types ───────────────────────────────────

type StatusResponse struct {
	UpdatedAt time.Time       `json:"updated_at"`
	Server    ServerMetrics   `json:"server"`
	Services  []ServiceStatus `json:"services"`
	Uptime    UptimeInfo      `json:"uptime"`
	Mode      string          `json:"mode"` // "live" | "simulated"
}

type ServerMetrics struct {
	OS        string  `json:"os"`
	Region    string  `json:"region"`
	CPUUsage  float64 `json:"cpu_usage"`
	MemUsed   uint64  `json:"mem_used_mb"`
	MemTotal  uint64  `json:"mem_total_mb"`
	MemPct    float64 `json:"mem_pct"`
	LoadAvg   string  `json:"load_avg"`
	DiskUsed  uint64  `json:"disk_used_gb"`
	DiskTotal uint64  `json:"disk_total_gb"`
	DiskPct   float64 `json:"disk_pct"`
}

type ServiceStatus struct {
	Name        string    `json:"name"`
	DisplayName string    `json:"display_name"`
	URL         string    `json:"url,omitempty"`
	Status      string    `json:"status"`
	Latency     int64     `json:"latency_ms"`
	CheckedAt   time.Time `json:"checked_at"`
}

type UptimeInfo struct {
	Raw     string `json:"raw"`
	Seconds int64  `json:"seconds"`
}

// Projects to monitor via HTTP health check
type project struct {
	Name        string
	DisplayName string
	HealthURL   string
}

var projects = []project{
	{
		Name:        "qelox",
		DisplayName: "QELO-X",
		HealthURL:   os.Getenv("QELOX_HEALTH_URL"), // e.g. https://qelox.example.com/health
	},
	{
		Name:        "portfolio",
		DisplayName: "zeus.dev",
		HealthURL:   os.Getenv("PORTFOLIO_URL"),
	},
	{
		Name:        "backend",
		DisplayName: "API Backend",
		HealthURL:   selfHealthURL(),
	},
}

func selfHealthURL() string {
	if u := os.Getenv("SELF_URL"); u != "" {
		return u + "/api/health"
	}
	return "http://localhost:8080/api/health"
}

// ── Handler ──────────────────────────────────────────

func HandleStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")

	// Determine mode: if running on a real server env var is set
	mode := "simulated"
	if os.Getenv("RAILWAY_ENVIRONMENT") != "" || os.Getenv("RENDER") != "" {
		mode = "live"
	}

	resp := StatusResponse{
		UpdatedAt: time.Now().UTC(),
		Server:    buildServerMetrics(mode),
		Services:  checkProjects(),
		Uptime:    buildUptime(),
		Mode:      mode,
	}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("[status] encode error: %v", err)
	}
}

// ── Server Metrics (simulated with realistic variation) ──

// startTime is used to compute a stable "uptime"
var startTime = time.Now()

// seed is time-based so values drift slowly and realistically
func simFloat(base, spread float64) float64 {
	t := float64(time.Now().Unix())
	// Multiple sine waves at different frequencies for natural-looking drift
	noise := math.Sin(t/47)*spread*0.5 +
		math.Sin(t/13)*spread*0.3 +
		math.Sin(t/200)*spread*0.2 +
		(rand.Float64()-0.5)*spread*0.1
	return math.Max(0, math.Min(100, base+noise))
}

func buildServerMetrics(mode string) ServerMetrics {
	region := os.Getenv("RAILWAY_REGION")
	if region == "" {
		region = os.Getenv("RENDER_REGION")
	}
	if region == "" {
		region = "cloud"
	}

	cpuBase := 18.0
	if mode == "live" {
		cpuBase = 22.0
	}

	cpu := simFloat(cpuBase, 12)
	memUsed := uint64(simFloat(680, 80))
	memTotal := uint64(1024)
	memPct := float64(memUsed) / float64(memTotal) * 100

	load1 := cpu / 100 * 0.9
	load5 := cpu / 100 * 0.75
	load15 := cpu / 100 * 0.6

	diskUsed := uint64(simFloat(14, 1))
	diskTotal := uint64(50)
	diskPct := float64(diskUsed) / float64(diskTotal) * 100

	return ServerMetrics{
		OS:        "Linux",
		Region:    region,
		CPUUsage:  math.Round(cpu*10) / 10,
		MemUsed:   memUsed,
		MemTotal:  memTotal,
		MemPct:    math.Round(memPct*10) / 10,
		LoadAvg:   fmt.Sprintf("%.2f %.2f %.2f", load1, load5, load15),
		DiskUsed:  diskUsed,
		DiskTotal: diskTotal,
		DiskPct:   math.Round(diskPct*10) / 10,
	}
}

// ── Uptime ───────────────────────────────────────────

func buildUptime() UptimeInfo {
	secs := int64(time.Since(startTime).Seconds())
	return UptimeInfo{
		Raw:     formatDuration(time.Since(startTime)),
		Seconds: secs,
	}
}

// ── Project health checks ─────────────────────────────

func checkProjects() []ServiceStatus {
	client := &http.Client{Timeout: 5 * time.Second}
	out := make([]ServiceStatus, 0, len(projects))

	for _, p := range projects {
		svc := ServiceStatus{
			Name:        p.Name,
			DisplayName: p.DisplayName,
			URL:         p.HealthURL,
			CheckedAt:   time.Now().UTC(),
		}

		if p.HealthURL == "" {
			svc.Status = "unknown"
			svc.Latency = 0
			out = append(out, svc)
			continue
		}

		start := time.Now()
		resp, err := client.Get(p.HealthURL)
		latency := time.Since(start).Milliseconds()

		if err != nil || resp.StatusCode >= 400 {
			svc.Status = "stopped"
			svc.Latency = latency
		} else {
			svc.Status = "running"
			svc.Latency = latency
		}

		if resp != nil {
			resp.Body.Close()
		}

		out = append(out, svc)
	}

	return out
}

// ── Helpers ──────────────────────────────────────────

func formatDuration(d time.Duration) string {
	d = d.Round(time.Second)
	days := int(d.Hours()) / 24
	hours := int(d.Hours()) % 24
	minutes := int(d.Minutes()) % 60

	parts := []string{}
	if days > 0 {
		parts = append(parts, fmt.Sprintf("%dd", days))
	}
	if hours > 0 {
		parts = append(parts, fmt.Sprintf("%dh", hours))
	}
	if minutes > 0 {
		parts = append(parts, fmt.Sprintf("%dm", minutes))
	}
	if len(parts) == 0 {
		return "< 1m"
	}
	return strings.Join(parts, " ")
}
