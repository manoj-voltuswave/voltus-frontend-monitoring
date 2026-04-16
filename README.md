# voltus-frontend-monitoring

Synthetic monitoring for the Voltuswave frontend across dev / qa / pre-prod / prod.

- **prod** → monitored by Checkly (hosted Playwright runners, every 5 min).
- **dev / qa / pre-prod** → monitored by this repo's GitHub Actions workflow (`.github/workflows/monitor.yml`, every 5 min); on success each env pings its Checkly heartbeat monitor, which Checkly emails on silence past its grace window.

On any failure the alert emails go to `ambatimanojwork@gmail.com`, `a.manoj@voltuswave.com`, and `Vinod.p@voltuswave.com`.

## What each check verifies

1. Homepage returns 2xx.
2. `Sign in` heading, `Email` input, and `Password` input all render (proves the JS bundle loaded and the React app mounted).
3. No failed asset requests on `voltusfreight.com` / `voltuswave.com` / `shipwave.net` (catches the MIME / 404 failure mode).

Generic console errors are intentionally not asserted — they are noisy in lower envs and the render-checks already cover the failure mode that matters.

## Required GitHub Secrets (for the workflow)

- `HEARTBEAT_DEV_URL`
- `HEARTBEAT_QA_URL`
- `HEARTBEAT_PREPROD_URL`

Each is a Checkly heartbeat monitor URL (shape: `https://ping.checklyhq.com/<uuid>`). The workflow POSTs to the corresponding URL on success; on failure, Checkly trips after its grace window (10 min) and emails the alert recipients.

## Local commands

Requires `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` in your env.

```bash
npm install
npx playwright install chromium

# Run prod check against Checkly's hosted runners
npm test
npm run deploy

# Run dev/qa/pre-prod check locally (without pinging heartbeats)
npx tsx src/monitor/run.ts
```
