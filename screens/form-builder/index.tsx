'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

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

export type FormFieldOrGroup = FormFieldCustomType | FormFieldCustomType[]

export default function FormBuilder() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [formFields, setFormFields] = useState<FormFieldOrGroup[]>([])
  const [selectedField, setSelectedField] = useState<FormFieldCustomType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addFormField = (variant: string, index: number, type?: FormFieldCustomType) => {
    const newFieldName = `name_${Math.random().toString().slice(-10)}`

    const { label, description, placeholder, customType } = defaultFieldConfig[variant] || {
      label: '',
      description: '',
      placeholder: '',
    }

    const newField: FormFieldCustomType | undefined = initializeFormField(variant) as FormFieldCustomType

  console.log('new field ', newField)

    setFormFields([...formFields, newField])
  }

  const findFieldPath = (
    fields: FormFieldOrGroup[],
    name: string,
  ): number[] | null => {
    const search = (
      currentFields: FormFieldOrGroup[],
      currentPath: number[],
    ): number[] | null => {
      for (let i = 0; i < currentFields.length; i++) {
        const field = currentFields[i]
        if (Array.isArray(field)) {
          const result = search(field, [...currentPath, i])
          if (result) return result
        } else if (field.ui.label === name) {
          return [...currentPath, i]
        }
      }
      return null
    }
    return search(fields, [])
  }

  const updateFormField = (path: number[], updates: Partial<FormFieldCustomType>) => {
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
    setSelectedField(field)
    setIsDialogOpen(true)
  }

  const handleSaveField = (updatedField: FormFieldCustomType) => {
    if (selectedField) {
      const path = findFieldPath(formFields, selectedField.ui.label!)
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
  console.log('form builder formfields', formFields)
  return (
    <section className="md:max-h-screen space-y-8">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Playground</h1>
        <p className="text-sm text-muted-foreground">
          After successfully installing Shadcn, you can simply copy and paste
          the generated form components to get started. Some components may have
          additional dependencies, so make sure to review their documentation in
          the{' '}
          <Link href="/readme" className="underline text-slate-800  dark:text-white dark:font-semibold">
            README
          </Link>{' '}
          for further instructions.
        </p>
        {/* <Editor /> */}
      </div>
      <If
        condition={formFields.length > 0}
        render={() => (
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:px-5 h-full">
            <div className="w-full h-full col-span-1 md:space-x-3 md:max-h-[75vh] flex flex-col md:flex-row ">
              <FieldSelectorWithSeparator
                addFormField={(variant: string, index: number = 0, type?: FormFieldCustomType) =>
                  addFormField(variant, index, type)
                }
              />
              <div className="overflow-y-auto flex-1 ">
                <FormFieldList
                  formFields={formFields}
                  setFormFields={setFormFields}
                  updateFormField={updateFormField}
                  openEditDialog={openEditDialog}
                />
              </div>
            </div>
            <div className="col-span-1 w-full h-full space-y-3">
              <SpecialComponentsNotice formFields={formFields} />
              <FormPreview
                key={JSON.stringify(formFields)}
                formFields={formFields}
              />
            </div>
          </div>
        )}
        otherwise={() => (
          <div className="flex flex-col md:flex-row items-center gap-3 md:px-5">
            <FieldSelectorWithSeparator
              addFormField={(variant: string, index: number = 0, type?: FormFieldCustomType) =>
                addFormField(variant, index, type)
              }
            />
            <EmptyListSvg className="mx-auto" />
          </div>
        )}
      />
      <EditFieldDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        field={selectedField}
        onSave={handleSaveField}
      />
    </section>
  )
}
