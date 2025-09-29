import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/connection'
import { z } from 'zod'

const submitFormSchema = z.object({
  data: z.record(z.any()),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional()
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { data, ipAddress, userAgent } = submitFormSchema.parse(body)

    const db = getDatabase()
    
    // Check if form exists
    const form = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM web_forms WHERE id = ? AND is_active = 1', [params.id], (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    }) as any

    if (!form) {
      return NextResponse.json(
        { error: 'Form not found or inactive' },
        { status: 404 }
      )
    }

    // Create submission
    const submissionId = crypto.randomUUID()
    
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO form_submissions (id, form_id, data, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
        [submissionId, params.id, JSON.stringify(data), ipAddress, userAgent],
        (err) => {
          if (err) reject(err)
          else resolve(null)
        }
      )
    })

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully'
    })

  } catch (error) {
    console.error('Submit form error:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
