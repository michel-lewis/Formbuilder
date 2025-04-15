import { useEffect, useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FormFieldType } from '@/types'
import { defaultFieldConfig, fieldTypes } from '@/constants'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import If from '@/components/ui/if'
import { LuColumns2, LuPencil, LuTrash2 } from 'react-icons/lu'
import { FormFieldCustomType } from '@/constants/interfarce'
import { initializeFormField } from '@/constants/global-utils'

export type FormFieldOrGroup = FormFieldCustomType | FormFieldCustomType[]

interface Props {
  index: number
  subIndex?: number
  field: FormFieldCustomType
  formFields: FormFieldOrGroup[]
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldOrGroup[]>>
  updateFormField?: (path: number[], updates: Partial<FormFieldCustomType>) => void
  openEditDialog: (field: FormFieldCustomType) => void
  onRemove?: () => void
}

export const FieldItem = ({
  index,
  subIndex,
  field,
  formFields,
  setFormFields,
  // updateFormField,
  openEditDialog,
  onRemove,
}: Props) => {
  const showColumnButton =
    subIndex === undefined ||
    subIndex === (formFields[index] as FormFieldCustomType[]).length - 1

  const path = subIndex !== undefined ? [index, subIndex] : [index]
  const [columnCount, setColumnCount] = useState(() =>
    Array.isArray(formFields[index]) ? formFields[index].length : 1,
  )

  const addNewColumn = (variant: string, index: number) => {
    const newFieldName = `name_${Math.random().toString().slice(-10)}`
    const existingFields = Array.isArray(formFields[index])
      ? (formFields[index] as FormFieldCustomType[]).map((field) => field.ui.label)
      : [formFields[index]?.ui.label]

    if (existingFields.includes(newFieldName)) return

    const newField: FormFieldCustomType | undefined = initializeFormField(variant) as FormFieldCustomType

    setFormFields((prevFields) => {
      const newFields = [...prevFields]
      if (Array.isArray(newFields[index])) {
        const currentFieldNames = (newFields[index] as FormFieldCustomType[]).map(
          (field) => field.ui.label,
        )
        if (!currentFieldNames.includes(newFieldName)) {
          ;(newFields[index] as FormFieldCustomType[]).push(newField)
        }
      } else if (newFields[index]) {
        newFields[index] = [newFields[index] as FormFieldCustomType, newField]
      } else {
        newFields[index] = newField
      }
      return newFields
    })
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    } else {
      removeColumn()
    }
  }

  const removeColumn = () => {
    const rowIndex = path[0]
    const subIndex = path.length > 1 ? path[1] : null

    setFormFields((prevFields) => {
      console.log("previews fields", prevFields)
      const newFields = [...prevFields]

      if (Array.isArray(newFields[rowIndex])) {
        const row = [...(newFields[rowIndex] as FormFieldCustomType[])]

        if (subIndex !== null && subIndex >= 0 && subIndex < row.length) {
          row.splice(subIndex, 1)

          if (row.length > 0) {
            newFields[rowIndex] = row
            setColumnCount(row.length)
          } else {
            newFields.splice(rowIndex, 1)
            setColumnCount(1)
          }
        }
      } else {
        newFields.splice(rowIndex, 1)
        setColumnCount(1)
      }

      return newFields
    })
  }

  useEffect(() => {
    const newColumnCount = Array.isArray(formFields[index])
      ? formFields[index].length
      : 1
    setColumnCount(newColumnCount)
  }, [formFields, index])

  return (
    <Reorder.Item
      value={field}
      id={field.ui.label}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.15 },
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      whileDrag={{ backgroundColor: '#9ca3af', borderRadius: '12px' }}
      className={cn('w-full', {
        'col-span-12': columnCount === 1,
        'col-span-6': columnCount === 2,
        'col-span-3': columnCount === 3,
        'col-span-2': columnCount >= 4,
      })}
      key={`${field.technical.key}-${columnCount}`}
    >
      <motion.div
        layout="position"
        className="flex items-center gap-2"
        key={`${field.ui.label}-${columnCount}`}
      >
        <div className="flex items-center gap-1 border rounded-xl px-2 py-1 w-full">
          <If
            condition={Array.isArray(formFields[index])}
            render={() => <LuColumns2 className="cursor-grab w-4 h-4" />}
          />
          <div className="flex items-center w-full">
            <div className="w-full text-sm">{field.technical.fieldType}</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openEditDialog(field)}
            >
              <LuPencil />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRemove}>
              <LuTrash2 />
            </Button>
          </div>
        </div>
        <If
          condition={showColumnButton}
          render={() => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="min-w-9 w-9 h-9 rounded-full"
                >
                  +
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Component</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {fieldTypes.map((fieldType) => (
                  <DropdownMenuItem
                    key={fieldType.name}
                    onClick={() => {
                      addNewColumn(fieldType.name, index)
                      setColumnCount((prev) => prev + 1)
                    }}
                  >
                    {fieldType.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
      </motion.div>
    </Reorder.Item>
  )
}