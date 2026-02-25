BIN   := zeus-backend
BUILD := ./cmd/server

.PHONY: dev build clean tidy

## Run locally (loads .env automatically)
dev:
	@export $$(grep -v '^#' .env | grep -v '^$$' | xargs) && go run $(BUILD)/main.go

## Build production binary
build:
	go build -ldflags="-s -w" -o $(BIN) $(BUILD)/main.go

## Tidy modules
tidy:
	go mod tidy

## Remove binary
clean:
	rm -f $(BIN)
