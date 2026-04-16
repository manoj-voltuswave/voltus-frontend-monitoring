import { BrowserCheck, Frequency } from 'checkly/constructs'
import * as path from 'path'
import { allAlertChannels } from '../alerts.js'

new BrowserCheck('voltus-prod-homepage', {
  name: 'Voltus Prod — Homepage Loads',
  frequency: Frequency.EVERY_5M,
  tags: ['frontend', 'prod'],
  alertChannels: allAlertChannels,
  code: {
    entrypoint: path.join(__dirname, 'prod.spec.ts'),
  },
})
