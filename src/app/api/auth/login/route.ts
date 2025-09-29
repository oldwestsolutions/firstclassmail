import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/connection'
import { verifyPassword } from '@/lib/auth/hash'
import { generateToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    const db = getDatabase()
    
    // Find user
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    }) as any

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at)
    })

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
