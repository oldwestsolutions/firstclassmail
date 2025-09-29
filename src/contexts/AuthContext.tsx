'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth token on mount
    const checkAuth = () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        // In a real app, you'd validate the token with your backend
        setUser({
          id: '1',
          name: 'John Smith',
          email: 'john@example.com'
        })
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you'd validate credentials with your backend
    if (email && password) {
      const token = 'demo-token-' + Date.now()
      localStorage.setItem('authToken', token)
      
      setUser({
        id: '1',
        name: 'John Smith',
        email: email
      })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
