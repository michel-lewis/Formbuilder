// contexts/drag-drop-context.tsx
'use client'

import { createContext, useContext, useState } from 'react'
import { FormFieldCustomType } from '@/constants/interfarce'
import { initializeFormField } from '@/constants/global-utils'
import { FormFieldOrGroup } from '@/screens/field-item'

interface DragDropContextType {
  formFields: FormFieldOrGroup[]
  addFormField: (variant: string, index?: number) => void
  moveFormField: (fromIndex: number, toIndex: number) => void
  selectedField: FormFieldCustomType | null
  setSelectedField: (field: FormFieldCustomType | null) => void
  updateFormField: (path: number[], updates: Partial<FormFieldCustomType>) => void
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined)

export function DragDropProvider({ children }: { children: React.ReactNode }) {
  const [formFields, setFormFields] = useState<FormFieldOrGroup[]>([])
  const [selectedField, setSelectedField] = useState<FormFieldCustomType | null>(null)

  const addFormField = (variant: string, index?: number) => {
    const newField = initializeFormField(variant) as FormFieldCustomType
    setFormFields(prev => 
      index !== undefined 
        ? [...prev.slice(0, index), newField, ...prev.slice(index)] 
        : [...prev, newField]
    )
  }

  const moveFormField = (fromIndex: number, toIndex: number) => {
    setFormFields(prev => {
      const newFields = [...prev]
      const [movedField] = newFields.splice(fromIndex, 1)
      newFields.splice(toIndex, 0, movedField)
      return newFields
    })
  }

  const updateFormField = (path: number[], updates: Partial<FormFieldCustomType>) => {
    setFormFields(prev => {
      const updatedFields = JSON.parse(JSON.stringify(prev))
      let current: any = updatedFields
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }
      current[path[path.length - 1]] = {
        ...current[path[path.length - 1]],
        ...updates,
      }
      return updatedFields
    })
  }

  return (
    <DragDropContext.Provider
      value={{
        formFields,
        addFormField,
        moveFormField,
        selectedField,
        setSelectedField,
        updateFormField
      }}
    >
      {children}
    </DragDropContext.Provider>
  )
}

export function useDragDrop() {
  const context = useContext(DragDropContext)
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider')
  }
  return context
}