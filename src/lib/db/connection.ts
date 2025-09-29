import { Database } from 'sqlite3'
import { createTables } from './schema'

let db: Database | null = null

export const getDatabase = (): Database => {
  if (!db) {
    db = new Database('./database.sqlite')
    createTables(db)
  }
  return db
}

export const closeDatabase = (): void => {
  if (db) {
    db.close()
    db = null
  }
}
