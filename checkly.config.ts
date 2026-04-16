import { defineConfig } from 'checkly'

export default defineConfig({
  projectName: 'voltus-frontend-monitoring',
  logicalId: 'voltus-frontend-monitoring',
  checks: {
    runtimeId: '2026.04',
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['frontend'],
    checkMatch: '**/__checks__/**/*.check.ts',
  },
  cli: {
    runLocation: 'us-east-1',
  },
})
