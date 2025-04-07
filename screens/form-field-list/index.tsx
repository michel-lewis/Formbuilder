// Finally, update FormFieldList.tsx to accept dropped field types
import React, { useState, useCallback, useRef } from 'react'
import { Reorder, AnimatePresence, motion } from 'framer-motion'
import { FormFieldType } from '@/types'
import { FieldItem } from '@/screens/field-item'
import { LuRows2 } from 'react-icons/lu'
import { Badge } from '@/components/ui/badge'
import { FormFieldCustomType } from '@/constants/interfarce'
import { useDrop } from 'react-dnd'
import { initializeFormField } from '@/constants/global-utils'

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
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);


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

  // Calculate drop position based on mouse position
  const calculateDropIndex = (clientY: number) => {
    if (!listRef.current || formFields.length === 0) return formFields.length;
    
    const { top } = listRef.current.getBoundingClientRect();
    const fieldItems = listRef.current.querySelectorAll('.field-item');
    
    // If there are no items, drop at the beginning
    if (fieldItems.length === 0) return 0;
    
    // Calculate the position for each item
    for (let i = 0; i < fieldItems.length; i++) {
      const item = fieldItems[i];
      const { top: itemTop, height } = item.getBoundingClientRect();
      const itemMiddle = itemTop + height / 2;
      
      if (clientY < itemMiddle) {
        return i;
      }
    }
    
    // If after all items, drop at the end
    return formFields.length;
  };

  // Set up drop zone
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'FIELD_TYPE',
    drop: (item: { type: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const dropIndex = calculateDropIndex(clientOffset.y);
        
        // Create a new field
        const newField = initializeFormField(item.type) as FormFieldCustomType;
        
        if (newField) {
          const newFields = [...formFields];
          newFields.splice(dropIndex, 0, newField);
          setFormFields(newFields);
        }
      }
    },
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const dropIndex = calculateDropIndex(clientOffset.y);
        setDropIndicatorPosition(dropIndex);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div 
      ref={(node) => {
        dropRef(node);
        listRef.current = node;
      }}
      className={`mt-3 lg:mt-0 min-h-[200px] rounded-lg p-2 ${isOver && canDrop ? 'bg-primary/5 ring-2 ring-primary/20' : ''}`}
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
              ? item.map((f) => f.ui.label).join('-')
              : item.ui.label
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
              {Array.isArray(item) ? (
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
                  field={item}
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
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 p-4">
          <p className="text-gray-500 text-center">
            Drag field components here to build your form
          </p>
        </div>
      )}
    </div>
  )
}
