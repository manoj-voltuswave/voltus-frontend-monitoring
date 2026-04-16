import { HeartbeatMonitor } from 'checkly/constructs'
import { allAlertChannels } from '../alerts.js'

new HeartbeatMonitor('voltus-dev-heartbeat', {
  name: 'Voltus DEV — Heartbeat',
  period: 5,
  periodUnit: 'minutes',
  grace: 10,
  graceUnit: 'minutes',
  tags: ['frontend', 'dev', 'heartbeat'],
  alertChannels: allAlertChannels,
})

new HeartbeatMonitor('voltus-qa-heartbeat', {
  name: 'Voltus QA — Heartbeat',
  period: 5,
  periodUnit: 'minutes',
  grace: 10,
  graceUnit: 'minutes',
  tags: ['frontend', 'qa', 'heartbeat'],
  alertChannels: allAlertChannels,
})

new HeartbeatMonitor('voltus-preprod-heartbeat', {
  name: 'Voltus PRE-PROD — Heartbeat',
  period: 5,
  periodUnit: 'minutes',
  grace: 10,
  graceUnit: 'minutes',
  tags: ['frontend', 'preprod', 'heartbeat'],
  alertChannels: allAlertChannels,
})
