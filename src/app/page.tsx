'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Server, 
  FormInput, 
  Shield, 
  Zap, 
  Globe,
  CheckCircle,
  ArrowRight,
  Users,
  BarChart3,
  Scale,
  FileText,
  Lock,
  Award,
  Building2,
  Gavel
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Mail,
      title: 'Virtual Mailboxes for Everyone',
      description: 'Professional virtual mailboxes for individuals, small businesses, entrepreneurs, and anyone who needs a reliable mail address.',
      benefits: ['Professional Business Address', 'Mail Scanning & Forwarding', 'Secure Mail Storage', '24/7 Access']
    },
    {
      icon: Server,
      title: 'Mail Management Services',
      description: 'Complete mail management with scanning, forwarding, and digital storage options for all your mail needs.',
      benefits: ['Mail Scanning', 'Digital Storage', 'Mail Forwarding', 'Package Handling']
    },
    {
      icon: FileText,
      title: 'Document Processing',
      description: 'Professional handling of all types of mail including packages, documents, and important correspondence.',
      benefits: ['Package Receiving', 'Document Scanning', 'Mail Organization', 'Secure Storage']
    }
  ]

  const stats = [
    { label: 'Virtual Mailboxes Created', value: '50,000+' },
    { label: 'Mail Items Processed', value: '5M+' },
    { label: 'Happy Customers', value: '25,000+' },
    { label: 'Uptime Guarantee', value: '99.99%' }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Small Business Owner",
      quote: "FirstClass Mail has been a game-changer for my business. I can receive mail from anywhere, and the scanning feature lets me stay on top of important documents even when I'm traveling."
    },
    {
      name: "Mike Rodriguez",
      title: "Digital Nomad",
      quote: "As someone who travels constantly, having a reliable virtual mailbox is essential. FirstClass Mail handles all my mail professionally and I never miss anything important."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-navy-800 rounded-sm">
                <Mail className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <span className="text-lg md:text-xl font-serif font-bold text-navy-900">FirstClass Mail</span>
                <p className="text-xs text-gray-600 -mt-1 hidden sm:block">Virtual Mailbox Services</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-navy-700 hover:text-navy-900 transition-colors font-medium">Services</Link>
              <Link href="#compliance" className="text-navy-700 hover:text-navy-900 transition-colors font-medium">Compliance</Link>
              <Link href="#about" className="text-navy-700 hover:text-navy-900 transition-colors font-medium">About</Link>
              <Link href="#contact" className="text-navy-700 hover:text-navy-900 transition-colors font-medium">Contact</Link>
              <Link href="/portal" className="btn btn-primary px-6 py-3">Client Portal</Link>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-navy-700 hover:text-navy-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-gold-100 text-gold-800 text-xs md:text-sm font-medium rounded-sm">
                Trusted by 25,000+ Customers Nationwide
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
              Professional Virtual
              <br />
              <span className="gold-accent">Mailbox Services</span>
              <br />
              for Everyone
            </h1>
            <p className="text-base md:text-xl text-navy-100 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Secure virtual mailboxes, professional mail handling, and convenient mail management 
              for individuals, small businesses, entrepreneurs, and digital nomads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
              <Link href="/portal" className="btn btn-accent px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold w-full sm:w-auto">
                Access Client Portal
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link href="#services" className="btn btn-secondary px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold w-full sm:w-auto">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-navy-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-3 md:mb-4">
              Trusted Virtual Mailbox Provider
            </h2>
            <p className="text-base md:text-lg text-navy-700 max-w-2xl mx-auto px-4">
              Professional virtual mailbox services for individuals and businesses nationwide with secure mail handling and convenience.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-4 md:p-8 rounded-sm shadow-sm border border-gray-200"
              >
                <div className="text-2xl md:text-4xl font-bold text-navy-800 mb-1 md:mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-navy-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-navy-900 mb-4 md:mb-6">
              Virtual Mailbox Solutions for Everyone
            </h2>
            <p className="text-base md:text-xl text-navy-700 max-w-3xl mx-auto leading-relaxed px-4">
              Professional virtual mailbox services and mail management solutions designed for 
              individuals, small businesses, entrepreneurs, and anyone who needs reliable mail handling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`card p-6 md:p-10 cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? 'ring-2 ring-navy-500 shadow-xl border-navy-200' : 'hover:shadow-lg'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6">
                  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-navy-100 rounded-sm mb-3 md:mb-0 md:mr-4">
                    <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-navy-800" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-serif font-bold text-navy-900">{feature.title}</h3>
                </div>
                <p className="text-navy-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{feature.description}</p>
                <ul className="space-y-2 md:space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-navy-700">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-gold-600 mr-2 md:mr-3 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-3 md:mb-4">
              Trusted by Customers Nationwide
            </h2>
            <p className="text-base md:text-lg text-navy-700 max-w-2xl mx-auto px-4">
              See what our customers say about our virtual mailbox services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 md:p-8"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-navy-800 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <span className="text-white font-bold text-sm md:text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-navy-600 text-xs md:text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <blockquote className="text-navy-700 italic leading-relaxed text-sm md:text-base">
                  "{testimonial.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 md:mb-6">
            Ready to Get Your Virtual Mailbox?
          </h2>
          <p className="text-base md:text-xl text-navy-200 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Join thousands of customers already using FirstClass Mail for convenient 
            virtual mailbox services and professional mail management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
            <Link href="/portal" className="btn btn-accent px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold w-full sm:w-auto">
              Access Client Portal
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Link>
            <Link href="#contact" className="btn btn-secondary px-6 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold w-full sm:w-auto">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-gold-600 rounded-sm">
                  <Mail className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <span className="text-lg md:text-xl font-serif font-bold">FirstClass Mail</span>
                  <p className="text-navy-300 text-xs md:text-sm">Virtual Mailbox Services</p>
                </div>
              </div>
              <p className="text-navy-300 leading-relaxed text-sm md:text-base">
                Professional virtual mailbox services and mail management solutions designed for 
                individuals, small businesses, entrepreneurs, and anyone who needs reliable mail handling.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-semibold mb-4 md:mb-6 text-base md:text-lg">Services</h3>
              <ul className="space-y-2 md:space-y-3 text-navy-300">
                <li><Link href="#services" className="hover:text-gold-400 transition-colors text-sm md:text-base">Virtual Mailboxes</Link></li>
                <li><Link href="#services" className="hover:text-gold-400 transition-colors text-sm md:text-base">Mail Scanning</Link></li>
                <li><Link href="#services" className="hover:text-gold-400 transition-colors text-sm md:text-base">Mail Forwarding</Link></li>
                <li><Link href="#services" className="hover:text-gold-400 transition-colors text-sm md:text-base">Package Handling</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold mb-4 md:mb-6 text-base md:text-lg">Support</h3>
              <ul className="space-y-2 md:space-y-3 text-navy-300">
                <li><Link href="#help" className="hover:text-gold-400 transition-colors text-sm md:text-base">Customer Support</Link></li>
                <li><Link href="#contact" className="hover:text-gold-400 transition-colors text-sm md:text-base">Contact Us</Link></li>
                <li><Link href="#docs" className="hover:text-gold-400 transition-colors text-sm md:text-base">Help Center</Link></li>
                <li><Link href="#faq" className="hover:text-gold-400 transition-colors text-sm md:text-base">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-semibold mb-4 md:mb-6 text-base md:text-lg">Legal</h3>
              <ul className="space-y-2 md:space-y-3 text-navy-300">
                <li><Link href="#about" className="hover:text-gold-400 transition-colors text-sm md:text-base">About</Link></li>
                <li><Link href="#privacy" className="hover:text-gold-400 transition-colors text-sm md:text-base">Privacy Policy</Link></li>
                <li><Link href="#terms" className="hover:text-gold-400 transition-colors text-sm md:text-base">Terms of Service</Link></li>
                <li><Link href="#security" className="hover:text-gold-400 transition-colors text-sm md:text-base">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-800 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-navy-400 text-sm md:text-base">
                &copy; 2024 FirstClass Mail. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-navy-400">
                <span className="flex items-center text-sm">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  HIPAA Compliant
                </span>
                <span className="flex items-center text-sm">
                  <Lock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  SOC 2 Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
