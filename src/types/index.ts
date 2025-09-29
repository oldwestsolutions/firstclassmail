export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface VirtualMailbox {
  id: string
  userId: string
  address: string
  name: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MailMessage {
  id: string
  mailboxId: string
  from: string
  to: string
  subject: string
  body: string
  isRead: boolean
  receivedAt: Date
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  filename: string
  contentType: string
  size: number
  url: string
}

export interface WebForm {
  id: string
  userId: string
  name: string
  fields: FormField[]
  isActive: boolean
  submissions: FormSubmission[]
  createdAt: Date
  updatedAt: Date
}

export interface FormField {
  id: string
  name: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  label: string
  required: boolean
  options?: string[]
  placeholder?: string
}

export interface FormSubmission {
  id: string
  formId: string
  data: Record<string, any>
  submittedAt: Date
  ipAddress: string
  userAgent: string
}

export interface MailServer {
  id: string
  userId: string
  domain: string
  smtpHost: string
  smtpPort: number
  imapHost: string
  imapPort: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
