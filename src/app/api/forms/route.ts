import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/connection'
import { verifyToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const createFormSchema = z.object({
  name: z.string().min(1),
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio']),
    label: z.string(),
    required: z.boolean(),
    options: z.array(z.string()).optional(),
    placeholder: z.string().optional()
  }))
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
    const forms = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM web_forms WHERE user_id = ? ORDER BY created_at DESC',
        [user.id],
        (err, rows) => {
          if (err) reject(err)
          else resolve(rows)
        }
      )
    })

    return NextResponse.json({ forms })

  } catch (error) {
    console.error('Get forms error:', error)
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 })
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
    const { name, fields } = createFormSchema.parse(body)

    const db = getDatabase()
    
    // Create new form
    const formId = crypto.randomUUID()
    
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO web_forms (id, user_id, name, fields) VALUES (?, ?, ?, ?)',
        [formId, user.id, name, JSON.stringify(fields)],
        (err) => {
          if (err) reject(err)
          else resolve(null)
        }
      )
    })

    return NextResponse.json({
      success: true,
      form: { id: formId, name, fields, isActive: true }
    })

  } catch (error) {
    console.error('Create form error:', error)
    return NextResponse.json({ error: 'Failed to create form' }, { status: 500 })
  }
}
