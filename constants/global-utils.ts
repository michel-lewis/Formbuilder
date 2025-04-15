export interface FormFieldCustomType {
  technical: {
    id: string;
    key: string;
    fieldType: string;
    inputType?: string;
    maxLength?: number;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: string;
    options?: any[];
  };
  ui: {
    label: string;
    placeholder?: string;
    size?: string;
    styleVariant?: string;
    locale?: string;
  };
  cms: {
    translatable: boolean;
  };
  validation: {
    required: boolean;
  };
  data?: {
    sourceType?: string;
    staticOptions?: any[];
  };
}
export interface Translation {
  id: string;
  label: string;
  value: string;
}

export interface Translations {
  en: Translation[];
  fr: Translation[];
}

export function initializeFormField(fieldType: string): FormFieldCustomType {
  // Valeurs par défaut communes à tous les champs
  const baseField: Partial<FormFieldCustomType> = {
    technical: {
      id: `${fieldType}-${Date.now()}`,
      key: '',
      fieldType: fieldType,
    },
    ui: {
      label: '',
    },
    cms: {
      translatable: false,
    },
    validation: {
      required: false,
    },
  };

  // Configurations spécifiques par type de champ
  switch (fieldType) {
    case 'Input':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'text',
          maxLength: 255,
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          placeholder: '',
          size: 'medium',
          styleVariant: 'outlined',
        },
      } as FormFieldCustomType;

    case 'Password':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'password',
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          placeholder: '••••••••',
        },
      } as FormFieldCustomType;

    case 'Select':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          options: [],
          type: 'fields',
        },
        data: {
          sourceType: 'static',
          staticOptions: [],
        },
      } as FormFieldCustomType;
    case 'Combobox':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          options: [],
          type: 'fields',
        },
        data: {
          sourceType: 'static',
          staticOptions: [],
        },
      } as FormFieldCustomType;

    case 'Multi Select':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          options: [],
          type: 'fields',
        },
        data: {
          sourceType: 'static',
          staticOptions: [],
        },
      } as FormFieldCustomType;

    case 'Date Picker':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          locale: 'enUS',
        },
      } as FormFieldCustomType;

    // Continuer pour tous les autres cas...
    case 'Datetime Picker':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          locale: 'enUS',
        },
      } as FormFieldCustomType;

    case 'Checkbox':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          defaultValue: 'false',
          type: 'fields',
        },
      } as FormFieldCustomType;

    case 'Switch':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          defaultValue: 'false',
          type: 'fields',
        },
      } as FormFieldCustomType;

    case 'Slider':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          min: 0,
          max: 100,
          step: 1,
          type: 'fields',
        },
      } as FormFieldCustomType;

    case 'File Input':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'file',
          type: 'fields',
        },
      } as FormFieldCustomType;

    case 'Phone':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'tel',
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          placeholder: '+1 (123) 456-7890',
        },
      } as FormFieldCustomType;

    case 'Signature Input':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'signature',
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          placeholder: 'Sign here',
        },
      } as FormFieldCustomType;

    case 'Textarea':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'textarea',
          maxLength: 1000,
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          placeholder: 'Enter text',
        },
      } as FormFieldCustomType;
    case 'Rating':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'rating',
          type: 'fields',
        },
        ui: {
          ...baseField.ui,
          placeholder: 'Rate this',
        },
      } as FormFieldCustomType;

    // Le cas Flex Row Panel garde son type 'panels'
    case 'Flex Row Panel':
      return {
        technical: {
          id: `panel-${Date.now()}`,
          key: `panel-${Date.now()}`,
          fieldType: "container",
          inputType: "panel",
          type: "panels",
          fields: []
        },
        ui: { 
          label: "Flex Container", 
          className: "flex flex-row gap-4",
          styleVariant: 'outlined',
          style: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            width: '100%'
          }
        },
        cms: { 
          translatable: false
        },
        validation: { 
          required: false
        },
        layout: {
          gridColumnSpan: 12
        }
      } as FormFieldCustomType;
      
    case 'Three Column Row':
      return {
        technical: {
          id: `panel-${Date.now()}`,
          key: `panel-${Date.now()}`,
          fieldType: "container",
          inputType: "panel",
          type: "panels",
          fields: []
        },
        ui: { 
          label: "Three Column Layout", 
          className: "flex flex-row justify-between gap-4",
          styleVariant: 'outlined',
          style: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '1rem',
            width: '100%'
          }
        },
        cms: { 
          translatable: false
        },
        validation: { 
          required: false
        },
        layout: {
          gridColumnSpan: 12
        }
      } as FormFieldCustomType;

      case 'Two Column Row':
      return {
        technical: {
          id: `panel-${Date.now()}`,
          key: `panel-${Date.now()}`,
          fieldType: "container",
          inputType: "panel",
          type: "panels",
          fields: []
        },
        ui: { 
          label: "Two Column Layout", 
          className: "grid grid-cols-2 gap-4",
          styleVariant: 'outlined',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            width: '100%'
          }
        },
        cms: { 
          translatable: false
        },
        validation: { 
          required: false
        },
        layout: {
          gridColumnSpan: 12
        }
      } as FormFieldCustomType;
      
    default:
      return {
        ...baseField,
      } as FormFieldCustomType;
  }
}
