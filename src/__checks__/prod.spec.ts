import { test, expect } from '@playwright/test'

const PROD_URL = 'https://worldzone.voltusfreight.com/'
const OWN_DOMAINS = /voltusfreight\.com|voltuswave\.com|shipwave\.net/

test('prod homepage loads and login form renders', async ({ page }) => {
  const failedOwnRequests: string[] = []

  // Failed asset load on our domains is the MIME / 404 failure mode we care about.
  // Generic console errors (failing API calls, etc.) are intentionally NOT asserted;
  // the "login form renders" checks below are what prove the JS bundle loaded.
  page.on('requestfailed', (req) => {
    const u = req.url()
    if (OWN_DOMAINS.test(u)) {
      failedOwnRequests.push(`${u} — ${req.failure()?.errorText}`)
    }
  })

  const response = await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 20_000 })
  expect(response?.status(), 'homepage should return 2xx').toBeLessThan(400)

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible({ timeout: 10_000 })
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()

  expect(
    failedOwnRequests,
    `Failed requests on our domains:\n${failedOwnRequests.join('\n')}`
  ).toEqual([])
})
