FROM golang:1.22-alpine AS builder
WORKDIR /app

# Copy go.mod first (no go.sum in project)
COPY backend/go.mod ./backend/
WORKDIR /app/backend
RUN go mod download

# Copy source
WORKDIR /app
COPY backend/ ./backend/

# Build static binary
WORKDIR /app/backend
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app/zeus-backend ./cmd/server/main.go

# Production stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/
COPY --from=builder /app/zeus-backend .

# Ensure binary is executable
RUN chmod +x ./zeus-backend

EXPOSE 8080

# Run the binary
CMD ["./zeus-backend"]
