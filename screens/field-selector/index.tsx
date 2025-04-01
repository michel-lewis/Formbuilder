import React from 'react'

import { fieldTypes } from '@/constants'
import { Button } from '@/components/ui/button'
import If from '@/components/ui/if'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { FormFieldCustomType } from '@/constants/interfarce'

type FieldSelectorProps = {
  addFormField: (variant: string, index?: number, type?: FormFieldCustomType ) => void
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  addFormField,
}) => {
  return (
    <div className="flex md:flex-col items-start flex-wrap md:flex-nowrap gap-3 h-[70vh] overflow-y-auto">
      {fieldTypes.map((variant) => (
        <div className="flex items-center gap-1" key={variant.name}>
          <Button
            key={variant.name}
            variant="outline"
            onClick={() => addFormField(variant.name, variant.index, variant.type)}
            className="rounded-full"
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
          <If
            condition={variant.isNew}
            render={() => (
              <Badge variant={'new'} className='hidden md:block ml-1 p-1 text-[10px]'>
                New
              </Badge>
            )}
          />
        </div>
      ))}
      <Link href="https://shadcnform.featurebase.app/" target="_blank">
        <Button className="rounded-full" size="sm">
          Request
        </Button>
      </Link>
    </div>
  )
}
