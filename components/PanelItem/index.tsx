import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { FieldItem } from '@/screens/field-item'
import { FormFieldCustomType } from '@/constants/interfarce'
import { initializeFormField } from '@/constants/global-utils'
import { Reorder } from 'framer-motion'
import { LuTrash2, LuPencil } from 'react-icons/lu'
import { Button } from '@/components/ui/button'

interface PanelItemProps {
  panel: FormFieldCustomType
  index: number
  updateFormField: (path: number[], updates: Partial<FormFieldCustomType>) => void
  openEditDialog: (field: FormFieldCustomType) => void
  formFields: any[]
  setFormFields: React.Dispatch<React.SetStateAction<any[]>>
}

export const PanelItem: React.FC<PanelItemProps> = ({
  panel,
  index,
  updateFormField,
  openEditDialog,
  formFields,
  setFormFields,
}) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'FIELD_TYPE',
    drop: (item: { type: string }) => {
      const newField = initializeFormField(item.type) as FormFieldCustomType
      newField.isChildren = true;
      if (newField) {
        const updatedPanel = {
          ...panel,
          children: [...(panel.children || []), newField]
        }
        updateFormField([index], updatedPanel)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  // Connect the drop ref to our DOM element
  drop(dropRef);

  const removeChild = (childIndex: number) => {
    const updatedChildren = [...panel.children]
    updatedChildren.splice(childIndex, 1)
    updateFormField([index], { ...panel, children: updatedChildren })
  }

  const removePanel = () => {
    setFormFields(prev => {
      const newFields = [...prev]
      newFields.splice(index, 1)
      return newFields
    })
  }

  return (
    <div 
      ref={dropRef}
      className={`p-4 rounded-lg border-2 border-dashed ${
        isOver 
          ? 'border-blue-300' 
          : 'border-gray-200'
      } w-full`}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium">{panel.ui.label}</span>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => openEditDialog(panel)}
            className="h-8 w-8"
          >
            <LuPencil className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={removePanel}
            className="h-8 w-8"
          >
            <LuTrash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 min-h-[80px]">
        {panel.children?.length ? (
          <Reorder.Group
            axis="x"
            values={panel.children}
            onReorder={(newOrder) => {
              updateFormField([index], { ...panel, children: newOrder })
            }}
            className={panel.ui.className}
          >
            {panel.children.map((child: any, childIndex: number | undefined) => (
              <Reorder.Item 
                key={child.technical.id} 
                value={child}
                className="flex-1 min-w-[200px]"
              >
                <FieldItem
                  field={child}
                  index={index}
                  subIndex={childIndex}
                  formFields={formFields}
                  setFormFields={setFormFields}
                  updateFormField={(path, updates) => {
                    const updatedChildren = [...(panel.children || [])]
                    updatedChildren[path[1]] = { ...updatedChildren[path[1]], ...updates }
                    updateFormField([index], { ...panel, children: updatedChildren })
                  }}
                  openEditDialog={openEditDialog}
                  onRemove={() => childIndex !== undefined && removeChild(childIndex)}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <div className="text-sm text-gray-500 italic w-full text-center py-4 rounded-lg border-2 border-dashed border-gray-200">
            Drag fields here to add them to this panel
          </div>
        )}
      </div>
    </div>
  )
}