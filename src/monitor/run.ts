import { chromium } from 'playwright'
import { checkEnvironment } from './check.js'

type Env = {
  name: string
  url: string
  heartbeatEnv: string
}

const ENVS: Env[] = [
  { name: 'dev', url: 'https://dev.voltuswave.com/', heartbeatEnv: 'HEARTBEAT_DEV_URL' },
  { name: 'qa', url: 'https://voltus.voltusfreight.net/', heartbeatEnv: 'HEARTBEAT_QA_URL' },
  { name: 'preprod', url: 'https://worldzone.shipwave.net/', heartbeatEnv: 'HEARTBEAT_PREPROD_URL' },
]

async function pingHeartbeat(env: Env): Promise<void> {
  const url = process.env[env.heartbeatEnv]
  if (!url) {
    console.warn(`⚠ ${env.name}: ${env.heartbeatEnv} is not set — skipping heartbeat ping`)
    return
  }
  try {
    const res = await fetch(url, { method: 'POST' })
    console.log(`✔ ${env.name}: heartbeat ping → HTTP ${res.status}`)
  } catch (err) {
    console.error(`✖ ${env.name}: heartbeat ping failed —`, err)
  }
}

async function main(): Promise<void> {
  const browser = await chromium.launch()
  try {
    const results = await Promise.all(
      ENVS.map(async (env) => {
        const context = await browser.newContext()
        const page = await context.newPage()
        try {
          await checkEnvironment(page, env.url)
          return { env, ok: true as const }
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err)
          return { env, ok: false as const, error: message }
        } finally {
          await context.close()
        }
      })
    )

    for (const r of results) {
      if (r.ok) {
        console.log(`✔ ${r.env.name} (${r.env.url}) — passed`)
        await pingHeartbeat(r.env)
      } else {
        console.error(`✖ ${r.env.name} (${r.env.url}) — FAILED\n${r.error}`)
      }
    }
  } finally {
    await browser.close()
  }

  // Always exit 0: UptimeRobot handles alerting via missed heartbeats.
  // Exiting non-zero would trigger noisy GitHub Actions failure emails.
  process.exit(0)
}

main().catch((err) => {
  console.error('Unexpected fatal error:', err)
  process.exit(0)
})
