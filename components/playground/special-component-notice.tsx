import { Link } from 'next-view-transitions'

import { SPECIAL_COMPONENTS } from '@/constants/special-components'
import { FormFieldType } from '@/types'
import { FormFieldCustomType } from '@/constants/interfarce'

export type FormFieldOrGroup = FormFieldCustomType | FormFieldCustomType[]

const SpecialComponentsNotice = ({
  formFields,
}: {
  formFields: FormFieldOrGroup[]
}) => {
  const usedSpecialComponents = SPECIAL_COMPONENTS.filter((component) =>
    formFields.some(
      (field) => !Array.isArray(field) && field.technical.inputType === component.variant,
    ),
  )

  if (usedSpecialComponents.length === 0) return null

  return (
    <>
      <p className="text-sm text-muted-foreground">
        This form includes special components, add the component in your
        directory.
      </p>
      <ul className="list-disc text-sm text-muted-foreground pl-3">
        {usedSpecialComponents.map((component) => (
          <li key={component.variant}>
            <Link
              href={component.url}
              target="_blank"
              className="hover:underline"
            >
              {component.variant}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SpecialComponentsNotice
