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
      id: `field-${Date.now()}`,
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
        },
        data: {
          sourceType: 'static',
          staticOptions: [],
        },
      } as FormFieldCustomType;

    case 'Date Picker':
      return {
        ...baseField,
        ui: {
          ...baseField.ui,
          locale: 'enUS', // Valeur par défaut
        },
      } as FormFieldCustomType;
    case 'Datetime Picker':
      return {
        ...baseField,
        ui: {
          ...baseField.ui,
          locale: 'enUS', // Valeur par défaut
        },
      } as FormFieldCustomType;

    case 'Checkbox':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          defaultValue: 'false',
        },
      } as FormFieldCustomType;
    case 'Switch':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          defaultValue: 'false',
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
        },
      } as FormFieldCustomType;

    case 'File Input':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'file',
        },
      } as FormFieldCustomType;

    case 'Textarea':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          maxLength: 1000,
        },
      } as FormFieldCustomType;
    case 'Password':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'password',
        },
        ui: {
          ...baseField.ui,
          placeholder: '••••••••',
        },
      } as FormFieldCustomType;
    case 'Phone':
      return {
        ...baseField,
        technical: {
          ...baseField.technical,
          inputType: 'tel',
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
        },
        ui: {
          ...baseField.ui,
          placeholder: 'Rate this',
        },
      } as FormFieldCustomType;
    default:
      return {
        ...baseField,
      } as FormFieldCustomType;
  }
}
