package middleware

import (
	"log"
	"net"
	"net/http"
	"os"
	"sync"
	"time"
)

// Chain wraps a handler with multiple middleware (first listed = outermost).
func Chain(h http.Handler, mw ...func(http.Handler) http.Handler) http.Handler {
	for i := len(mw) - 1; i >= 0; i-- {
		h = mw[i](h)
	}
	return h
}

// ── CORS ─────────────────────────────────────────────

func CORS(next http.Handler) http.Handler {
	origin := os.Getenv("ALLOWED_ORIGIN")
	if origin == "" {
		origin = "*" // dev default — tighten in production
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin",  origin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// ── Logger ───────────────────────────────────────────

type wrappedWriter struct {
	http.ResponseWriter
	status int
}

func (w *wrappedWriter) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}

func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		ww    := &wrappedWriter{ResponseWriter: w, status: 200}
		next.ServeHTTP(ww, r)
		log.Printf("%-5s %-30s %d  %s  %s",
			r.Method, r.URL.Path, ww.status, time.Since(start), ip(r))
	})
}

func ip(r *http.Request) string {
	if v := r.Header.Get("X-Real-IP"); v != "" { return v }
	if v := r.Header.Get("X-Forwarded-For"); v != "" { return v }
	h, _, _ := net.SplitHostPort(r.RemoteAddr)
	return h
}

// ── Rate Limit ───────────────────────────────────────
// 20 POST requests / minute per IP. GET is unrestricted.

type bucket struct {
	count int
	reset time.Time
}

var (
	mu      sync.Mutex
	buckets = map[string]*bucket{}
)

func RateLimit(next http.Handler) http.Handler {
	go func() {
		for range time.Tick(2 * time.Minute) {
			mu.Lock()
			for k, b := range buckets {
				if time.Now().After(b.reset) {
					delete(buckets, k)
				}
			}
			mu.Unlock()
		}
	}()

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			next.ServeHTTP(w, r)
			return
		}

		addr := ip(r)
		mu.Lock()
		b, ok := buckets[addr]
		if !ok || time.Now().After(b.reset) {
			buckets[addr] = &bucket{count: 1, reset: time.Now().Add(time.Minute)}
			mu.Unlock()
			next.ServeHTTP(w, r)
			return
		}
		b.count++
		over := b.count > 20
		mu.Unlock()

		if over {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Retry-After", "60")
			w.WriteHeader(http.StatusTooManyRequests)
			w.Write([]byte(`{"success":false,"message":"Too many requests. Try again in a minute."}`))
			return
		}

		next.ServeHTTP(w, r)
	})
}
