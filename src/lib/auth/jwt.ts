import jwt from 'jsonwebtoken'
import { User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const generateToken = (user: User): string => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const verifyToken = (token: string): { valid: boolean; user?: Partial<User> } => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return { 
      valid: true, 
      user: { 
        id: decoded.id, 
        email: decoded.email, 
        name: decoded.name 
      } 
    }
  } catch (error) {
    return { valid: false }
  }
}
