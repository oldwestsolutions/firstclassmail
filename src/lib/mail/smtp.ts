import nodemailer from 'nodemailer'
import { MailServer } from '@/types'

export class SMTPClient {
  private transporter: nodemailer.Transporter

  constructor(server: MailServer) {
    this.transporter = nodemailer.createTransporter({
      host: server.smtpHost,
      port: server.smtpPort,
      secure: server.smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendMail(to: string, subject: string, body: string, from?: string) {
    try {
      const result = await this.transporter.sendMail({
        from: from || process.env.SMTP_FROM,
        to,
        subject,
        text: body,
        html: body,
      })
      return { success: true, messageId: result.messageId }
    } catch (error) {
      console.error('SMTP Error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendHtmlMail(to: string, subject: string, htmlBody: string, from?: string) {
    try {
      const result = await this.transporter.sendMail({
        from: from || process.env.SMTP_FROM,
        to,
        subject,
        html: htmlBody,
      })
      return { success: true, messageId: result.messageId }
    } catch (error) {
      console.error('SMTP Error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}
