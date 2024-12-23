import ResetPassword from '@/emails/reset-email'
import LinkEmail from '@/emails/verify-email'
import { render } from '@react-email/components'
import { Link } from 'lucide-react'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Send a verification email to the user
export const sendVerificationEmail = async (email: string, token: string) => {
  //const confirmLink = `http://localhost:3000/new-verification?token=${token}`

  await resend.emails.send({
    from: 'Nizar <noreply@resend.dev>',
    to: email,
    subject: 'Confirm your email',
    html: render(LinkEmail({ token }))
  })

  resend.contacts.create({
    email: email,
    audienceId: process.env.RESEND_AUDIENCE as string
  })
}
// Send password reset token to user
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.APP_URL}/new-password?token=${token}`

  await resend.emails.send({
    from: 'Nizar <noreply@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: render(ResetPassword({ token }))
  })
}
