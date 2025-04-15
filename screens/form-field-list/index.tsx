import React, { useState, useCallback, useRef } from 'react'
import { Reorder, AnimatePresence, motion } from 'framer-motion'
import { FormFieldType } from '@/types'
import { FieldItem } from '@/screens/field-item'
import { LuRows2 } from 'react-icons/lu'
import { Badge } from '@/components/ui/badge'
import { FormFieldCustomType } from '@/constants/interfarce'
import { useDrop } from 'react-dnd'
import { initializeFormField } from '@/constants/global-utils'
import { PanelItem } from '@/components/PanelItem'
export type FormFieldOrGroup = FormFieldCustomType | FormFieldCustomType[]

type FormFieldListProps = {
  formFields: FormFieldOrGroup[]
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldOrGroup[]>>
  updateFormField: (path: number[], updates: Partial<FormFieldCustomType>) => void
  openEditDialog: (field: FormFieldCustomType) => void
}

export const FormFieldList: React.FC<FormFieldListProps> = ({
  formFields,
  setFormFields,
  updateFormField,
  openEditDialog,
}) => {
  const [rowTabs, setRowTabs] = useState<{ [key: number]: FormFieldCustomType[] }>({})
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  const handleHorizontalReorder = useCallback(
    (index: number, newOrder: FormFieldCustomType[]) => {
      setRowTabs((prev) => ({ ...prev, [index]: newOrder }))
      setTimeout(() => {
        setFormFields((prevFields) => {
          const updatedFields = [...prevFields]
          updatedFields[index] = newOrder
          return updatedFields
        })
      }, 1000)
    },
    [setFormFields],
  )

  const calculateDropIndex = (clientY: number) => {
    if (!listRef.current || formFields.length === 0) return formFields.length
    
    const { top } = listRef.current.getBoundingClientRect()
    const fieldItems = listRef.current.querySelectorAll('.field-item')
    
    if (fieldItems.length === 0) return 0
    
    for (let i = 0; i < fieldItems.length; i++) {
      const item = fieldItems[i]
      const { top: itemTop, height } = item.getBoundingClientRect()
      const itemMiddle = itemTop + height / 2
      
      if (clientY < itemMiddle) {
        return i
      }
    }
    
    return formFields.length
  }

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ['FIELD_TYPE', 'PANEL_TYPE'],
    drop: (item: { type: string; isPanel?: boolean }, monitor) => {
      const clientOffset = monitor.getClientOffset()
      if (clientOffset) {
        const dropIndex = calculateDropIndex(clientOffset.y)
        const newField = initializeFormField(item.type) as FormFieldCustomType
        
        if (newField) {
          setFormFields((prev) => {
            const newFields = [...prev]
            console.log('newField', dropIndex)
            console.log('newField', newField)

            
            if (!Array.isArray(newField) && 
                (newField as FormFieldCustomType).technical?.type === 'panels' && 
                !item.isPanel) {
              // Si on drop sur un panel, ajouter le champ dans fields du panel
              const newFields = [...prev, newField]
              const panel = newFields[dropIndex] as FormFieldCustomType
              // if (!Array.isArray(panel.technical.fields)) {
              //   panel.technical.fields = []
              // }
              // panel.technical.fields.push(newField)
              newFields[dropIndex] = panel
            } else {
              // Sinon, ajouter le champ normalement dans la liste
              newFields.splice(dropIndex, 0, newField)
            }
            
            return newFields
          })
        }
      }
    },
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset()
      if (clientOffset) {
        const dropIndex = calculateDropIndex(clientOffset.y)
        setDropIndicatorPosition(dropIndex)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  return (
    <div 
      ref={(node) => {
        dropRef(node)
        listRef.current = node
      }}
      className={`mt-3 lg:mt-0 min-h-[200px] w-full rounded-lg p-2 border-2 border-dashed ${isOver && canDrop ? 'border-primary/50 bg-primary/5' : 'border-gray-200'}`}
    >
      <Reorder.Group
        axis="y"
        onReorder={setFormFields}
        values={formFields}
        className="flex flex-col gap-1"
      >
        {formFields.map((item, index) => (
          <React.Fragment key={
            Array.isArray(item)
              ? item.map((f) => f.technical.id).join('-')
              : (item as FormFieldCustomType).technical.id
          }>
            {dropIndicatorPosition === index && isOver && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 4, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-primary rounded-full my-1"
              />
            )}
            <Reorder.Item
              value={item}
              className="flex items-center gap-1 field-item"
              whileDrag={{ backgroundColor: '#e5e7eb', borderRadius: '12px' }}
            >
              <LuRows2 className="cursor-grab w-4 h-4" />
              {!Array.isArray(item) && item.technical?.inputType === 'panel' ? (
                <PanelItem
                  panel={item as FormFieldCustomType}
                  index={index}
                  updateFormField={updateFormField}
                  openEditDialog={openEditDialog}
                  formFields={formFields}
                  setFormFields={setFormFields}
                />
              ) : Array.isArray(item) ? (
                <Reorder.Group
                  as="ul"
                  axis="x"
                  onReorder={(newOrder) =>
                    handleHorizontalReorder(index, newOrder)
                  }
                  values={rowTabs[index] || item}
                  className="w-full grid grid-cols-12 gap-1"
                >
                  <AnimatePresence initial={false}>
                    {(rowTabs[index] || item).map((field, fieldIndex) => (
                      <FieldItem
                        key={field.technical.id}
                        index={index}
                        subIndex={fieldIndex}
                        field={field}
                        formFields={formFields}
                        setFormFields={setFormFields}
                        updateFormField={updateFormField}
                        openEditDialog={openEditDialog}
                      />
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              ) : (
                <FieldItem
                  field={item as FormFieldCustomType}
                  index={index}
                  formFields={formFields}
                  setFormFields={setFormFields}
                  updateFormField={updateFormField}
                  openEditDialog={openEditDialog}
                />
              )}
            </Reorder.Item>
          </React.Fragment>
        ))}
        {dropIndicatorPosition === formFields.length && isOver && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 4, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary rounded-full my-1"
          />
        )}
      </Reorder.Group>
      
      {formFields.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96 w-full">
          <p className="text-gray-500 text-center">
            Drag field components here to build your form
          </p>
        </div>
      )}
    </div>
  )
}