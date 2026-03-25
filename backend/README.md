# zeus-backend

Go API backend for zeus.dev portfolio.
Handles contact form emails (Resend), serves live status + GitHub activity, and forwards GA4 events server-side.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/contact` | Sends contact form email via Resend |
| `POST` | `/api/qelox/purchase-confirmation` | Sends QELO-X thank-you email with download link |
| `POST` | `/api/analytics` | Proxies GA4 Measurement Protocol events server-side |
| `GET`  | `/api/status` | Server metrics + project health checks |
| `GET`  | `/api/github/activity` | Real GitHub public events feed |
| `GET`  | `/api/health` | Health check (used by Railway/Render) |

---

## Local Development

```bash
# 1. Clone and enter directory
cd zeus-backend

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Run (auto-loads .env)
make dev
```

The server starts on `http://localhost:8080`.

---

## Deploy — Railway (recommended, free tier)

Railway gives you a free persistent server with automatic deploys from Git.

### Steps

1. Push `zeus-backend/` to a GitHub repository

2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**

3. Select your repository

4. Railway detects Go automatically via `railway.toml` — no configuration needed

5. Go to **Variables** tab and add:

```
RESEND_API_KEY        = re_your_key_here
CONTACT_TO_EMAIL      = zeus@yourdomain.com
GITHUB_USERNAME       = your-github-username
GITHUB_TOKEN          = (optional, for higher rate limit)
ALLOWED_ORIGIN        = https://zeus.dev,https://www.zeus.dev,https://tech-bot-d4cb6.web.app
PORTFOLIO_URL         = https://zeus.dev
SELF_URL              = https://your-app.railway.app
GA4_MEASUREMENT_ID    = G-XXXXXXXXXX
GA4_API_SECRET        = your_measurement_protocol_secret
GA4_DEBUG             = false
```

6. Go to **Settings → Networking** → **Generate Domain** to get your public URL

7. Copy the URL (e.g. `https://zeus-backend.railway.app`) and set it as `VITE_API_URL` in the frontend

---

## Deploy — Render (alternative, free tier)

Render's free tier spins down after 15 minutes of inactivity (cold start ~30s).
Railway is preferred for always-on behavior.

### Steps

1. Push `zeus-backend/` to GitHub

2. Go to [render.com](https://render.com) → **New** → **Web Service**

3. Connect your GitHub repo

4. Render reads `render.yaml` automatically — no manual config needed

5. Go to **Environment** and add the same variables as listed above
   (replace `SELF_URL` with your Render URL, e.g. `https://zeus-backend.onrender.com`)

6. Click **Deploy**

---

## Resend Setup (free email API)

1. Create account at [resend.com](https://resend.com) — free tier: 3,000 emails/month

2. Go to **API Keys** → **Create API Key** → copy the key

3. Set `RESEND_API_KEY` in your deployment environment

4. Set `CONTACT_TO_EMAIL` to the email where you want to receive messages

> **Note:** On Resend's free tier, `From` must use `@resend.dev`.
> To send from your own domain (e.g. `contact@zeus.dev`), verify your domain in the Resend dashboard.

---

## GitHub Token (optional but recommended)

Without a token: **60 requests/hour** from GitHub API (shared by IP).
With a token: **5,000 requests/hour**.

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate new token (classic)**
3. No scopes needed — public data only
4. Set as `GITHUB_TOKEN`

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Auto | Set by Railway/Render automatically |
| `RESEND_API_KEY` | Yes | Resend API key for sending emails |
| `CONTACT_TO_EMAIL` | Yes | Your email address |
| `QELOX_DOWNLOAD_URL` | Yes for purchase emails | Download URL sent after QELO-X purchase confirmation |
| `GITHUB_USERNAME` | Yes | Your GitHub username |
| `GITHUB_TOKEN` | No | GitHub PAT for higher rate limit |
| `ALLOWED_ORIGIN` | Yes | One or more frontend URLs for CORS, separated by commas |
| `PORTFOLIO_URL` | No | Health check URL for portfolio |
| `QELOX_HEALTH_URL` | No | Health check URL for QELO-X |
| `SELF_URL` | No | Backend's own URL (for self health check) |
| `GA4_MEASUREMENT_ID` | Yes for analytics | Google Analytics 4 Measurement ID |
| `GA4_API_SECRET` | Yes for analytics | GA4 Measurement Protocol API secret |
| `GA4_DEBUG` | No | Use the GA4 debug endpoint while testing |
| `GA4_MP_ENDPOINT` | No | Override the GA4 Measurement Protocol endpoint |
