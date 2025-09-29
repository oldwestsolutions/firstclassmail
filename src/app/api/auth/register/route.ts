import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/connection'
import { hashPassword } from '@/lib/auth/hash'
import { generateToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, password } = registerSchema.parse(body)

    const db = getDatabase()
    
    // Check if user already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create new user
    const userId = crypto.randomUUID()
    const passwordHash = await hashPassword(password)
    
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)',
        [userId, email, name, passwordHash],
        (err) => {
          if (err) reject(err)
          else resolve(null)
        }
      )
    })

    const token = generateToken({ id: userId, email, name, createdAt: new Date(), updatedAt: new Date() })

    return NextResponse.json({
      success: true,
      token,
      user: { id: userId, email, name }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
