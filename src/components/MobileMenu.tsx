'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Package, FileText, Settings, Bell, User, LogOut } from 'lucide-react'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function MobileMenu({ isOpen, onClose, activeTab, onTabChange }: MobileMenuProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Mail },
    { id: 'mailboxes', label: 'My Mailboxes', icon: Package },
    { id: 'mail', label: 'Mail', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-navy-800 rounded-sm">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-serif font-bold text-navy-900">FirstClass Mail</span>
                    <p className="text-xs text-gray-600 -mt-1">Client Portal</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md text-gray-600 hover:text-navy-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id)
                      onClose()
                    }}
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

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-navy-800" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">John Smith</p>
                    <p className="text-xs text-gray-600">john@example.com</p>
                  </div>
                </div>
                
                <button className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                
                <button className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg">
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
