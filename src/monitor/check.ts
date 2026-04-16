import { Page } from 'playwright'

const OWN_DOMAINS = /voltusfreight\.com|voltuswave\.com|shipwave\.net/

export async function checkEnvironment(page: Page, url: string): Promise<void> {
  const failedOwnRequests: string[] = []

  // Failed asset load on our domains is the MIME / 404 failure mode we care about.
  // Generic console errors (failing API calls, Redux warnings, etc.) are noisy
  // in lower envs and intentionally NOT asserted — the "login form renders"
  // checks below are what prove the JS bundle loaded and the app mounted.
  page.on('requestfailed', (req) => {
    const u = req.url()
    if (OWN_DOMAINS.test(u)) {
      failedOwnRequests.push(`${u} — ${req.failure()?.errorText}`)
    }
  })

  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 20_000 })
  if (!response || response.status() >= 400) {
    throw new Error(`Homepage returned status ${response?.status() ?? 'no response'}`)
  }

  await page.getByRole('heading', { name: 'Sign in' }).waitFor({ state: 'visible', timeout: 10_000 })
  await page.getByLabel('Email').waitFor({ state: 'visible', timeout: 5_000 })
  await page.getByLabel('Password').waitFor({ state: 'visible', timeout: 5_000 })

  if (failedOwnRequests.length) {
    throw new Error(`Failed requests on our domains:\n${failedOwnRequests.join('\n')}`)
  }
}
