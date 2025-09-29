'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, GripVertical, Save, Eye } from 'lucide-react'
import { FormField } from '@/types'

interface FormBuilderProps {
  onSave: (fields: FormField[]) => void
  initialFields?: FormField[]
}

export default function FormBuilder({ onSave, initialFields = [] }: FormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(initialFields)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      name: `field_${fields.length + 1}`,
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: `Enter ${type}...`
    }
    setFields([...fields, newField])
  }

  const updateField = (index: number, updates: Partial<FormField>) => {
    const newFields = [...fields]
    newFields[index] = { ...newFields[index], ...updates }
    setFields(newFields)
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields]
    const [movedField] = newFields.splice(fromIndex, 1)
    newFields.splice(toIndex, 0, movedField)
    setFields(newFields)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveField(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
  }

  const renderFieldEditor = (field: FormField, index: number) => {
    return (
      <motion.div
        key={field.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="card p-4 mb-4"
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
            <span className="text-sm font-medium text-gray-700">
              {field.type.toUpperCase()} Field
            </span>
          </div>
          <button
            onClick={() => removeField(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
            <input
              type="text"
              value={field.name}
              onChange={(e) => updateField(index, { name: e.target.value })}
              className="input"
              placeholder="field_name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField(index, { label: e.target.value })}
              className="input"
              placeholder="Field Label"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={field.type}
              onChange={(e) => updateField(index, { type: e.target.value as FormField['type'] })}
              className="input"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="textarea">Textarea</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => updateField(index, { required: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Required</span>
            </label>
          </div>
        </div>

        {field.placeholder && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
            <input
              type="text"
              value={field.placeholder}
              onChange={(e) => updateField(index, { placeholder: e.target.value })}
              className="input"
              placeholder="Enter placeholder text..."
            />
          </div>
        )}

        {(field.type === 'select' || field.type === 'radio') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
            <div className="space-y-2">
              {(field.options || []).map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])]
                      newOptions[optionIndex] = e.target.value
                      updateField(index, { options: newOptions })
                    }}
                    className="input flex-1"
                    placeholder="Option value"
                  />
                  <button
                    onClick={() => {
                      const newOptions = (field.options || []).filter((_, i) => i !== optionIndex)
                      updateField(index, { options: newOptions })
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [...(field.options || []), '']
                  updateField(index, { options: newOptions })
                }}
                className="btn btn-secondary text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </button>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Form Builder</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onSave(fields)}
            className="btn btn-primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </button>
          <button className="btn btn-secondary">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
        </div>
      </div>

      {/* Add Field Buttons */}
      <div className="card p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Field</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { type: 'text', label: 'Text' },
            { type: 'email', label: 'Email' },
            { type: 'tel', label: 'Phone' },
            { type: 'textarea', label: 'Textarea' },
            { type: 'select', label: 'Select' },
            { type: 'checkbox', label: 'Checkbox' },
            { type: 'radio', label: 'Radio' }
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => addField(type as FormField['type'])}
              className="btn btn-secondary p-3 text-center"
            >
              <Plus className="h-4 w-4 mx-auto mb-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Fields List */}
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No fields added yet. Click "Add Field" to get started.</p>
          </div>
        ) : (
          fields.map((field, index) => renderFieldEditor(field, index))
        )}
      </div>
    </div>
  )
}
