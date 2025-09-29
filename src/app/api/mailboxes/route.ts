import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/connection'
import { verifyToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const createMailboxSchema = z.object({
  address: z.string().email(),
  name: z.string().min(1)
})

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { valid, user } = verifyToken(token)
    
    if (!valid || !user?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const db = getDatabase()
    const mailboxes = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM virtual_mailboxes WHERE user_id = ? ORDER BY created_at DESC',
        [user.id],
        (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        }
      )
    })

    return NextResponse.json({ mailboxes })

  } catch (error) {
    console.error('Get mailboxes error:', error)
    return NextResponse.json({ error: 'Failed to fetch mailboxes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { valid, user } = verifyToken(token)
    
    if (!valid || !user?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { address, name } = createMailboxSchema.parse(body)

    const db = getDatabase()
    
    // Check if mailbox already exists
    const existing = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM virtual_mailboxes WHERE address = ?', [address], (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Mailbox already exists' },
        { status: 400 }
      )
    }

    // Create new mailbox
    const mailboxId = crypto.randomUUID()
    
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO virtual_mailboxes (id, user_id, address, name) VALUES (?, ?, ?, ?)',
        [mailboxId, user.id, address, name],
        (err) => {
          if (err) reject(err)
          else resolve(null)
        }
      )
    })

    return NextResponse.json({
      success: true,
      mailbox: { id: mailboxId, address, name, isActive: true }
    })

  } catch (error) {
    console.error('Create mailbox error:', error)
    return NextResponse.json({ error: 'Failed to create mailbox' }, { status: 500 })
  }
}
