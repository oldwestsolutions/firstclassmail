import { Database } from 'sqlite3'

export const createTables = (db: Database) => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Virtual mailboxes table
  db.run(`
    CREATE TABLE IF NOT EXISTS virtual_mailboxes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      address TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `)

  // Mail messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS mail_messages (
      id TEXT PRIMARY KEY,
      mailbox_id TEXT NOT NULL,
      from_address TEXT NOT NULL,
      to_address TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      is_read BOOLEAN DEFAULT 0,
      received_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mailbox_id) REFERENCES virtual_mailboxes (id)
    )
  `)

  // Attachments table
  db.run(`
    CREATE TABLE IF NOT EXISTS attachments (
      id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL,
      filename TEXT NOT NULL,
      content_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (message_id) REFERENCES mail_messages (id)
    )
  `)

  // Web forms table
  db.run(`
    CREATE TABLE IF NOT EXISTS web_forms (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      fields TEXT NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `)

  // Form submissions table
  db.run(`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id TEXT PRIMARY KEY,
      form_id TEXT NOT NULL,
      data TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ip_address TEXT,
      user_agent TEXT,
      FOREIGN KEY (form_id) REFERENCES web_forms (id)
    )
  `)

  // Mail servers table
  db.run(`
    CREATE TABLE IF NOT EXISTS mail_servers (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      domain TEXT NOT NULL,
      smtp_host TEXT NOT NULL,
      smtp_port INTEGER NOT NULL,
      imap_host TEXT NOT NULL,
      imap_port INTEGER NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `)
}
