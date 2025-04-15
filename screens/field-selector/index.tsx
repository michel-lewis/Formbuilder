import React, {useEffect, useRef} from 'react'
import { fieldTypes } from '@/constants'
import { Button } from '@/components/ui/button'
import If from '@/components/ui/if'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { FormFieldCustomType } from '@/constants/interfarce'
import { useDrag } from 'react-dnd'

type FieldSelectorProps = {
  addFormField: (variant: string, index?: number, type?: FormFieldCustomType) => void
}

// Component for a single draggable field type button
const DraggableFieldItem = ({ variant, addFormField }: { 
  variant: { name: string, index: number, isNew?: boolean, isPanel?: boolean },
  addFormField: (variant: string, index?: number, type?: FormFieldCustomType) => void
}) => {
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: variant.isPanel ? 'PANEL_TYPE' : 'FIELD_TYPE',
    item: { 
      type: variant.name,
      isPanel: variant.isPanel 
    },
    collect: (monitor: { isDragging: () => any }) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  }, [drag]);

    // Style différent pour les panels
    const panelStyle = variant.isPanel 
    ? '' 
    : '';
  

  return (
    <div className="flex items-center gap-1" key={variant.name}>
      <div
      ref={dragRef}
      style={{ 
          opacity: isDragging ? 0.5 : 1,
          cursor: 'grab',
        }}
      >
        <Button
          key={variant.name}
          variant="outline"
          className={`rounded-full ${panelStyle} ${
            isDragging ? 'shadow-lg ring-2 ring-primary/20' : ''
          }`}
          size="sm"
        >
          {variant.name}
          <If
            condition={variant.isNew}
            render={() => (
              <Badge variant={'new'} className='md:hidden ml-1 p-1 text-[10px]'>
                New
              </Badge>
            )}
          />
        </Button>
      </div>
      <If
        condition={variant.isNew}
        render={() => (
          <Badge variant={'new'} className='hidden md:block ml-1 p-1 text-[10px]'>
            New
          </Badge>
        )}
      />
    </div>
  );
};

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  addFormField,
}) => {
  return (
    <div className="flex md:flex-col items-start flex-wrap md:flex-nowrap gap-3 h-[70vh] overflow-y-auto">
      {fieldTypes.map((variant) => (
        <DraggableFieldItem
          key={variant.name}
          variant={{...variant, index: variant.index || 0}}
          addFormField={addFormField}
        />
      ))}
      <Link href="https://shadcnform.featurebase.app/" target="_blank">
        <Button className="rounded-full" size="sm">
          Request
        </Button>
      </Link>
    </div>
  )
}
