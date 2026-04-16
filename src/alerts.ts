import { EmailAlertChannel } from 'checkly/constructs'

export const ambatiEmail = new EmailAlertChannel('email-ambati', {
  address: 'ambatimanojwork@gmail.com',
  sendRecovery: true,
  sendFailure: true,
})

export const manojEmail = new EmailAlertChannel('email-manoj', {
  address: 'a.manoj@voltuswave.com',
  sendRecovery: true,
  sendFailure: true,
})

export const vinodEmail = new EmailAlertChannel('email-vinod', {
  address: 'Vinod.p@voltuswave.com',
  sendRecovery: true,
  sendFailure: true,
})

export const allAlertChannels = [ambatiEmail, manojEmail, vinodEmail]
