'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Plus, 
  Settings, 
  Bell, 
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Package,
  FileText,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'
import { useAuth } from '@/contexts/AuthContext'

export default function ClientPortalPage() {
  const { user, isAuthenticated, login, logout, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [mailboxes, setMailboxes] = useState([
    {
      id: 1,
      address: 'john@firstclassmail.com',
      name: 'John Smith Mailbox',
      status: 'active',
      unreadCount: 3,
      totalMail: 24,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      address: 'business@firstclassmail.com',
      name: 'Business Mailbox',
      status: 'active',
      unreadCount: 0,
      totalMail: 156,
      lastActivity: '1 day ago'
    }
  ])
  const [recentMail, setRecentMail] = useState([
    {
      id: 1,
      from: 'Amazon',
      subject: 'Your order has shipped',
      receivedAt: '2 hours ago',
      isRead: false,
      type: 'package'
    },
    {
      id: 2,
      from: 'Bank of America',
      subject: 'Monthly statement available',
      receivedAt: '1 day ago',
      isRead: true,
      type: 'document'
    },
    {
      id: 3,
      from: 'IRS',
      subject: 'Tax document notification',
      receivedAt: '2 days ago',
      isRead: false,
      type: 'important'
    }
  ])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Mail },
    { id: 'mailboxes', label: 'My Mailboxes', icon: Package },
    { id: 'mail', label: 'Mail', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const stats = [
    { label: 'Total Mailboxes', value: '2', icon: Package, color: 'text-blue-600' },
    { label: 'Unread Messages', value: '3', icon: Mail, color: 'text-red-600' },
    { label: 'Packages Received', value: '12', icon: Package, color: 'text-green-600' },
    { label: 'Documents Scanned', value: '45', icon: FileText, color: 'text-purple-600' }
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    const success = await login(loginForm.email, loginForm.password)
    if (!success) {
      setLoginError('Invalid email or password')
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-navy-800 rounded-sm mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-navy-900 mb-2">Client Portal</h1>
            <p className="text-gray-600">Sign in to access your virtual mailboxes</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="your@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Sign In
            </button>
            <div className="text-center">
              <Link href="#register" className="text-navy-600 hover:text-navy-800 text-sm">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-navy-800 rounded-sm">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-serif font-bold text-navy-900">FirstClass Mail</span>
                <p className="text-xs text-gray-600 -mt-1">Client Portal</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-navy-900">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-navy-800" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-secondary text-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-navy-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-navy-100 text-navy-700 border border-navy-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <button className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    New Mailbox
                  </button>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="card p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Mail */}
                <div className="card p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Mail</h2>
                  <div className="space-y-4">
                    {recentMail.map((mail) => (
                      <div key={mail.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          mail.type === 'package' ? 'bg-green-500' : 
                          mail.type === 'important' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{mail.from}</p>
                          <p className="text-xs text-gray-500">{mail.subject}</p>
                        </div>
                        <div className="text-xs text-gray-500">{mail.receivedAt}</div>
                        {!mail.isRead && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'mailboxes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">My Mailboxes</h1>
                  <button className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Mailbox
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mailboxes.map((mailbox) => (
                    <div key={mailbox.id} className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Package className="h-8 w-8 text-navy-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{mailbox.name}</h3>
                            <p className="text-sm text-gray-600">{mailbox.address}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          mailbox.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {mailbox.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Unread</p>
                          <p className="text-lg font-semibold text-gray-900">{mailbox.unreadCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Mail</p>
                          <p className="text-lg font-semibold text-gray-900">{mailbox.totalMail}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Last activity: {mailbox.lastActivity}</span>
                        <div className="flex space-x-2">
                          <button className="btn btn-secondary text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </button>
                          <button className="btn btn-secondary text-xs">
                            <Settings className="h-3 w-3 mr-1" />
                            Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'mail' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Mail</h1>
                  <div className="flex space-x-2">
                    <button className="btn btn-secondary">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                    <button className="btn btn-secondary">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="card">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Search mail..."
                          className="input w-full"
                        />
                      </div>
                      <button className="btn btn-secondary">
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {recentMail.map((mail) => (
                      <div key={mail.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            mail.type === 'package' ? 'bg-green-500' : 
                            mail.type === 'important' ? 'bg-red-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900">{mail.from}</p>
                              {!mail.isRead && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                            </div>
                            <p className="text-sm text-gray-600">{mail.subject}</p>
                          </div>
                          <div className="text-xs text-gray-500">{mail.receivedAt}</div>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
                
                <div className="space-y-6">
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input type="text" className="input w-full" defaultValue="John Smith" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="input w-full" defaultValue="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input type="tel" className="input w-full" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive notifications about new mail</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Receive SMS alerts for important mail</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <button className="btn btn-primary">Update Preferences</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
