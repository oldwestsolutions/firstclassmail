'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FormField } from '@/types'

interface FormRendererProps {
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  formId: string
}

export default function FormRenderer({ fields, onSubmit, formId }: FormRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        handleInputChange(field.name, e.target.value),
      placeholder: field.placeholder,
      className: `input ${errors[field.name] ? 'border-red-500' : ''}`,
      required: field.required
    }

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            {...commonProps}
            type={field.type}
          />
        )

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={`input ${errors[field.name] ? 'border-red-500' : ''}`}
          />
        )

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={field.name} className="text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.name}_${index}`}
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`${field.name}_${index}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="card p-6">
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Submit Form
          </button>
        </div>
      </form>
    </motion.div>
  )
}
