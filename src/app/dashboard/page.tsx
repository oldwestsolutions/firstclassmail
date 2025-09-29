'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Server, 
  FormInput, 
  Plus, 
  Settings,
  BarChart3,
  Users,
  Mailbox,
  Globe,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [mailboxes, setMailboxes] = useState([])
  const [forms, setForms] = useState([])
  const [servers, setServers] = useState([])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'mailboxes', label: 'Mailboxes', icon: Mailbox },
    { id: 'forms', label: 'Web Forms', icon: FormInput },
    { id: 'servers', label: 'Mail Servers', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const stats = [
    { label: 'Total Mailboxes', value: '12', icon: Mailbox, color: 'text-blue-600' },
    { label: 'Active Forms', value: '8', icon: FormInput, color: 'text-green-600' },
    { label: 'Mail Servers', value: '3', icon: Server, color: 'text-purple-600' },
    { label: 'Messages Today', value: '156', icon: Mail, color: 'text-orange-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">FirstClass Mail</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-secondary px-4 py-2">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              <button className="btn btn-primary px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                New
              </button>
            </div>
          </div>
        </div>
      </header>

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
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
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
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
                
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

                {/* Quick Actions */}
                <div className="card p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/dashboard/mailbox/new" className="btn btn-primary p-4 text-center">
                      <Mailbox className="h-6 w-6 mx-auto mb-2" />
                      Create Mailbox
                    </Link>
                    <Link href="/dashboard/forms/new" className="btn btn-secondary p-4 text-center">
                      <FormInput className="h-6 w-6 mx-auto mb-2" />
                      Build Form
                    </Link>
                    <Link href="/dashboard/servers/new" className="btn btn-secondary p-4 text-center">
                      <Server className="h-6 w-6 mx-auto mb-2" />
                      Add Server
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">New message received</p>
                        <p className="text-xs text-gray-500">support@company.com • 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FormInput className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Form submission</p>
                        <p className="text-xs text-gray-500">Contact Form • 15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Server className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Server configuration updated</p>
                        <p className="text-xs text-gray-500">mail.company.com • 1 hour ago</p>
                      </div>
                    </div>
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
                  <h1 className="text-2xl font-bold text-gray-900">Virtual Mailboxes</h1>
                  <Link href="/dashboard/mailbox/new" className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Mailbox
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Mailbox className="h-8 w-8 text-primary-600" />
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">mailbox{i}@company.com</h3>
                      <p className="text-sm text-gray-600 mb-4">Business Communications</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Messages: 24</span>
                        <span>Unread: 3</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'forms' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Web Forms</h1>
                  <Link href="/dashboard/forms/new" className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Form
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FormInput className="h-8 w-8 text-green-600" />
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Contact Form {i}</h3>
                      <p className="text-sm text-gray-600 mb-4">Customer inquiries and support</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Submissions: 156</span>
                        <span>This week: 23</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'servers' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Mail Servers</h1>
                  <Link href="/dashboard/servers/new" className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Server
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Server className="h-8 w-8 text-purple-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">mail{i}.company.com</h3>
                            <p className="text-sm text-gray-600">SMTP/IMAP Server</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">SMTP:</span>
                          <span className="ml-2 text-gray-900">smtp.company.com:587</span>
                        </div>
                        <div>
                          <span className="text-gray-500">IMAP:</span>
                          <span className="ml-2 text-gray-900">imap.company.com:993</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="input w-full" defaultValue="user@company.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input type="text" className="input w-full" defaultValue="John Doe" />
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
                    <div className="space-y-4">
                      <button className="btn btn-secondary">Change Password</button>
                      <button className="btn btn-secondary">Enable 2FA</button>
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
