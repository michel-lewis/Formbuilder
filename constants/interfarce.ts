import * as Locales from 'date-fns/locale'
interface TechnicalProps {
    id: string;
    key: string;
    inputType?: string; 
    isComputed?: boolean;
    fieldType: string;
    defaultValue?: string;
    maxLength?: number;
    minLength?: number;
    min?: number;
    max?: number;
    options?: { value: string; label: string }[];
    step?: number;
    type: 'fields' | 'panels'; // Ajout du type panel
    children?: string[]; // Optionnel: pour contenir des IDs d'enfants si nécessaire
}

interface UIProps {
    label: string;
    placeholder?: string;
    hint?: string;
    icon?: string;
    size?: 'small' | 'medium' | 'large';
    styleVariant?: 'outlined' | 'filled' | 'standard';
    hidden?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    iconPrefix?: string;
    iconSuffix?: string;
    locale?: keyof typeof Locales;
    direction?: 'row' | 'column'; // Ajout pour les panels flex
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'; // Ajout pour les panels flex
    gap?: number; // Ajout pour les panels flex
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'; // Ajout pour les panels flex
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'; // Ajout pour les panels flex
}

interface TransalateType {
    key: string;
    english: string;
    french: string;
}

interface CMSProps {
    translatable: boolean;
    translationKey?: string;
    seoFriendly?: boolean;
    activeLocales?: string[];
    english?: string;
    french?: string;
}

interface ValidationProps {
    required: boolean;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    dependencies?: string[]; 
    customValidator?: (value: any) => boolean;
    message?: string
}


interface LogicProps {
    visibleIf?: (formValues: Record<string, any>) => boolean;
    requiredIf?: (formValues: Record<string, any>) => boolean;
    computeValue?: (formValues: Record<string, any>) => any;
    
}

interface DataProps {
    sourceType: 'static' | 'api' | 'database';
    staticOptions?: { value: string; label: string }[];
    apiEndpoint?: string;
}

interface LayoutProps {
    gridColumnSpan?: number;
    alignment?: 'left' | 'center' | 'right';
    order?: number;
}

interface AccessibilityProps {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    keyboardShortcuts?: string[];
}

interface DevOnlyProps {
    debug?: boolean;
    internalNotes?: string;
    testAttributes?: Record<string, string>; 
}

export interface FormFieldCustomType{
    children: any;
    technical: TechnicalProps;
    ui: UIProps;
    cms: CMSProps;
    validation: ValidationProps;
    logic?: LogicProps;
    data?: DataProps;
    layout?: LayoutProps;
    accessibility?: AccessibilityProps;
    devOnly?: DevOnlyProps;
    isChildren?: boolean;
}

export type ValidationRules = ValidationProps;
export type FormFieldProps = FormFieldCustomType;
export type FormField = FormFieldCustomType