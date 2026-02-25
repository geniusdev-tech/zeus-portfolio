package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"zeus-backend/internal/github"
	"zeus-backend/internal/mailer"
	"zeus-backend/internal/middleware"
	"zeus-backend/internal/status"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()

	// ── Routes ──────────────────────────────────────────
	mux.HandleFunc("POST /api/contact",        mailer.HandleContact)
	mux.HandleFunc("GET  /api/status",         status.HandleStatus)
	mux.HandleFunc("GET  /api/github/activity",github.HandleActivity)
	mux.HandleFunc("GET  /api/health",         handleHealth)

	// ── Middleware chain ─────────────────────────────────
	handler := middleware.Chain(
		mux,
		middleware.CORS,
		middleware.RateLimit,
		middleware.Logger,
	)

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("[zeus-backend] listening on :%s", port)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok","service":"zeus-backend"}`))
}
