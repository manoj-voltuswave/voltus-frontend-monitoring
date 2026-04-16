# voltus-frontend-monitoring

Synthetic monitoring for the Voltuswave frontend across dev / qa / pre-prod / prod.

- **prod** is monitored by Checkly (hosted Playwright runners, every 5 min).
- **dev / qa / pre-prod** will be monitored by a GitHub Actions + Playwright workflow in this repo (to be added).

On any failure the alert emails go to `ambatimanojwork@gmail.com`, `a.manoj@voltuswave.com`, and `Vinod.p@voltuswave.com`.

## Local commands

Requires `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` in your env (sourced from `~/.claude/mcp.env`).

```bash
npm install
npm test       # run checks locally
npm run deploy # push config to Checkly cloud
```
