import { BrowserCheck, Frequency, EmailAlertChannel } from 'checkly/constructs'
import * as path from 'path'

const ambatiEmail = new EmailAlertChannel('email-ambati', {
  address: 'ambatimanojwork@gmail.com',
  sendRecovery: true,
  sendFailure: true,
})

const manojEmail = new EmailAlertChannel('email-manoj', {
  address: 'a.manoj@voltuswave.com',
  sendRecovery: true,
  sendFailure: true,
})

const vinodEmail = new EmailAlertChannel('email-vinod', {
  address: 'Vinod.p@voltuswave.com',
  sendRecovery: true,
  sendFailure: true,
})

new BrowserCheck('voltus-prod-homepage', {
  name: 'Voltus Prod — Homepage Loads',
  frequency: Frequency.EVERY_5M,
  tags: ['frontend', 'prod'],
  alertChannels: [ambatiEmail, manojEmail, vinodEmail],
  code: {
    entrypoint: path.join(__dirname, 'prod.spec.ts'),
  },
})
