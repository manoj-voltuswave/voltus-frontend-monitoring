import { test, expect } from '@playwright/test'

const PROD_URL = 'https://worldzone.voltusfreight.com/'

test('prod homepage loads and login form renders', async ({ page }) => {
  const consoleErrors: string[] = []
  const failedOwnRequests: string[] = []

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', err => {
    consoleErrors.push(`pageerror: ${err.message}`)
  })
  page.on('requestfailed', req => {
    const url = req.url()
    // Only flag failures on our own domains; ignore third-party CDN/analytics blips
    if (/voltusfreight\.com|voltuswave\.com|shipwave\.net/.test(url)) {
      failedOwnRequests.push(`${url} — ${req.failure()?.errorText}`)
    }
  })

  const response = await page.goto(PROD_URL, { waitUntil: 'networkidle', timeout: 20_000 })
  expect(response?.status(), 'homepage should return 2xx').toBeLessThan(400)

  // Proves the React app mounted and the login form rendered
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible({ timeout: 10_000 })
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()

  expect(
    consoleErrors,
    `Unexpected console errors:\n${consoleErrors.join('\n')}`
  ).toEqual([])

  expect(
    failedOwnRequests,
    `Failed requests on our own domains:\n${failedOwnRequests.join('\n')}`
  ).toEqual([])
})
