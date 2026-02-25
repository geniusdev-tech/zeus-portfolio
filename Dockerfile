FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY backend/go.mod ./backend/
# No go.sum found in the project, so we ignore it
WORKDIR /app/backend
RUN go mod download
WORKDIR /app
COPY backend/ ./backend/
WORKDIR /app/backend
RUN go build -o /app/zeus-backend ./cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/zeus-backend .
EXPOSE 8080
CMD ["./zeus-backend"]
