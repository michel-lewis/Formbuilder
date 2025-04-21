// First, update your FormBuilder.tsx to include the DnD provider

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { FormFieldType } from '@/types'
import { defaultFieldConfig } from '@/constants'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Separator } from '@/components/ui/separator'
import If from '@/components/ui/if'
import SpecialComponentsNotice from '@/components/playground/special-component-notice'
import { FieldSelector } from '@/screens/field-selector'
import { FormFieldList } from '@/screens/form-field-list'
import { FormPreview } from '@/screens/form-preview'
import { EditFieldDialog } from '@/screens/edit-field-dialog'
import EmptyListSvg from '@/assets/oc-thinking.svg'
import Editor from '@/components/editor/editor'
import { FormFieldCustomType } from '@/constants/interfarce'
import { initializeFormField } from '@/constants/global-utils'
import { motion, AnimatePresence } from 'framer-motion'

export type FormFieldOrGroup = FormFieldCustomType | FormFieldCustomType[]

export default function FormBuilder() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [formFields, setFormFields] = useState<FormFieldOrGroup[]>([])
  const [selectedField, setSelectedField] = useState<FormFieldCustomType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'builder' | 'preview'>('builder')

  const addFormField = (variant: string, index: number = formFields.length, type?: FormFieldCustomType) => {
    const newField: FormFieldCustomType | undefined = initializeFormField(variant) as FormFieldCustomType
    console.log(" new field is it ", newField)
    if (newField) {
      // Create a new array and insert the field at the specified index
      const newFields = [...formFields];
      newFields.splice(index, 0, newField);
  
      setFormFields(newFields);
    }
  }

  const findFieldPath = (
    fields: FormFieldOrGroup[],
    name: string,
    isChildren: boolean,
  ): (string | number)[] | null => {
    const search = (
      currentFields: FormFieldOrGroup[],
      currentPath: number[],
    ): (number | string)[] | null => {
      console.log(" current fields is it ", currentFields)
      for (let i = 0; i < currentFields.length; i++) {
        const field = currentFields[i]
        if (isChildren === true && field && typeof field === 'object' && 'children' in field) {
          console.log("enter ", field)
          const childrenAsFormFields = Array.isArray(field.children) ? field.children : [];
          for (let j = 0; j < childrenAsFormFields.length; j++) {
            console.log(" name check ", name)
            if (childrenAsFormFields[j] && childrenAsFormFields[j].technical && childrenAsFormFields[j].technical.id === name) {
              console.log("enter check ", childrenAsFormFields[j])
              return [...currentPath, i, 'children', j]
            }
          }
        }
        else if (Array.isArray(field)) {
          const result = search(field, [...currentPath, i])
          console.log(" result is it  fields", result)
          if (result) return result
        } else if (isChildren === false && field && field.ui && field.ui.label === name) {
          console.log("enter check ", field, name)
          return [...currentPath, i]
        }
      }
      return null
    }
    return search(fields, [])
  }

  const updateFormField = (path: (string | number)[], updates: Partial<FormFieldCustomType>) => {
    const updatedFields = JSON.parse(JSON.stringify(formFields)) // Deep clone
    let current: any = updatedFields
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }
    current[path[path.length - 1]] = {
      ...current[path[path.length - 1]],
      ...updates,
    }
    setFormFields(updatedFields)
  }

  const openEditDialog = (field: FormFieldCustomType) => {
    console.log(" fields get ", field)
    setSelectedField(field)
    setIsDialogOpen(true)
  }

  const handleSaveField = (updatedField: FormFieldCustomType) => {
    console.log(" updated field is it ", updatedField)
    const isChildren = !!updatedField.isChildren  && updatedField.isChildren == true ? updatedField.isChildren : false  // Check if isChildren is true
    if (selectedField) {
      console.log(" selected field is it ", selectedField)
      const name = isChildren == true ? selectedField.technical.id : selectedField.ui.label!
      const path = findFieldPath(formFields, name, isChildren )
      console.log(" path is it ", path) // Add this line to check the path value
      if (path) {
        updateFormField(path, updatedField)
      }
    }
    localStorage.setItem('updatedField', JSON.stringify(updatedField));
    setIsDialogOpen(false)
  }

  const FieldSelectorWithSeparator = ({
    addFormField,
  }: {
    addFormField: (variant: string, index?: number, type?: FormFieldCustomType) => void
  }) => (
    <div className="flex flex-col md:flex-row gap-3">
      <FieldSelector addFormField={addFormField} />
      <Separator orientation={isDesktop ? 'vertical' : 'horizontal'} />
    </div>
  )
  console.log(formFields, "formfields")
  return (
    <DndProvider backend={HTML5Backend}>
      <section className="md:max-h-screen space-y-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-2xl font-semibold">Playground</h1>

          <div className="flex justify-center mb-6">
            <div
              role="tablist"
              aria-label="View mode selector"
              className="relative inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 w-48 shadow-inner"
            >
              <motion.div
                layout
                className={`absolute w-1/2 h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md ${viewMode === 'builder' ? 'left-1' : 'left-[calc(50%-0.125rem)]'
                  }`}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />

              <button
                role="tab"
                aria-selected={viewMode === 'builder'}
                aria-controls="builder-panel"
                id="builder-tab"
                className={`relative z-10 w-1/2 text-sm font-medium py-1.5 transition-colors rounded-full ${viewMode === 'builder'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                  }`}
                onClick={() => setViewMode('builder')}
              >
                <span className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden sm:inline-block"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                    <path d="M12 22.08V12" />
                  </svg>
                  Builder
                </span>
              </button>

              <button
                role="tab"
                aria-selected={viewMode === 'preview'}
                aria-controls="preview-panel"
                id="preview-tab"
                className={`relative z-10 w-1/2 text-sm font-medium py-1.5 transition-colors rounded-full ${viewMode === 'preview'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                  }`}
                onClick={() => setViewMode('preview')}
              >
                <span className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden sm:inline-block"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'builder' ? (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:px-5 h-full ">
                <div className="w-full h-full col-span-1 md:col-span-6 md:space-x-3 md:max-h-[75vh] flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 p-6">
                  <FieldSelectorWithSeparator
                    addFormField={addFormField}
                  />
                  <div className="overflow-y-auto flex-1 w-full">
                    <FormFieldList
                      formFields={formFields}
                      setFormFields={setFormFields}
                      updateFormField={updateFormField}
                      openEditDialog={openEditDialog}
                    />
                  </div>
                </div>
                <div className="w-full h-full col-span-1 md:col-span-4 md:space-x-3 md:max-h-[75vh] flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 p-6">
                  <div className="overflow-y-auto flex-1 w-full">
                    <EditFieldDialog
                      field={selectedField}
                      onSave={handleSaveField}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="px-4 md:px-5"
            >
              <SpecialComponentsNotice formFields={formFields} />
              <FormPreview
                key={JSON.stringify(formFields)}
                formFields={formFields}
              />
            </motion.div>
          )}
        </AnimatePresence>


      </section>
    </DndProvider>
  )
}
