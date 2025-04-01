import { FieldType } from '@/types'
import { formFieldsInstances } from './interfaces-instances';
import { FormFieldCustomType } from './interfarce';
export const fieldTypes: FieldType[] = [
  { name: 'Checkbox', isNew: false , type: formFieldsInstances.checkboxField },
  { name: 'Combobox', isNew: false, type: formFieldsInstances.combobox  },
  { name: 'Date Picker', isNew: false, type: formFieldsInstances.datePicker  },
  { name: 'Datetime Picker', isNew: true,  type: formFieldsInstances.datetimePicker },
  { name: 'File Input', isNew: false, type: formFieldsInstances.fileInput },
  { name: 'Input', isNew: false, type: formFieldsInstances.input },
  { name: 'Input OTP', isNew: false, type: formFieldsInstances.inputOtp },
  { name: 'Location Input', isNew: true, type: formFieldsInstances.datePicker },
  { name: 'Multi Select', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Password', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Phone', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Select', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Signature Input', isNew: true, type: formFieldsInstances.datePicker },
  { name: 'Slider', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Smart Datetime Input', isNew: true, type: formFieldsInstances.datePicker },
  { name: 'Switch', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Tags Input', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Textarea', isNew: false, type: formFieldsInstances.datePicker },
  { name: 'Rating', isNew: true, type: formFieldsInstances.datePicker },
  { name: 'RadioGroup', isNew: true, type: formFieldsInstances.datePicker },
]

export const defaultFieldConfig: Record<
  string,
  { label: string; description: string; placeholder?: any, customType?:FormFieldCustomType  }
> = {
  Checkbox: {
    label: 'Use different settings for my mobile devices',
    description:
      'You can manage your mobile notifications in the mobile settings page.',
    customType: formFieldsInstances.checkboxField,
  },
  Combobox: {
    label: 'Language',
    description: 'This is the language that will be used in the dashboard.',
  },
  'Date Picker': {
    label: 'Date of birth',
    description: 'Your date of birth is used to calculate your age.',
  },
  'Datetime Picker': {
    label: 'Submission Date',
    description: 'Add the date of submission with detailly.',
  },
  'File Input': {
    label: 'Select File',
    description: 'Select a file to upload.',
  },
  Input: {
    label: 'Username',
    description: 'This is your public display name.',
    placeholder: 'shadcn',
  },
  'Input OTP': {
    label: 'One-Time Password',
    description: 'Please enter the one-time password sent to your phone.',
  },
  'Location Input': {
    label: 'Select Country',
    description:
      'If your country has states, it will be appear after selecting country',
  },
  'Multi Select': {
    label: 'Select your framework',
    description: 'Select multiple options.',
  },
  Select: {
    label: 'Email',
    description: 'You can manage email addresses in your email settings.',
    placeholder: 'Select a verified email to display',
  },
  Slider: {
    label: 'Set Price Range',
    description: 'Adjust the price by sliding.',
  },
  'Signature Input': {
    label: 'Sign here',
    description: 'Please provide your signature above',
  },
  'Smart Datetime Input': {
    label: "What's the best time for you?",
    description: 'Please select the full time',
  },
  Switch: {
    label: 'Marketing emails',
    description: 'Receive emails about new products, features, and more.',
  },
  'Tags Input': { label: 'Enter your tech stack.', description: 'Add tags.' },
  Textarea: {
    label: 'Bio',
    description: 'You can @mention other users and organizations.',
  },
  Password: {
    label: 'Password',
    description: 'Enter your password.',
  },
  Phone: {
    label: 'Phone number',
    description: 'Enter your phone number.',
  },
  Rating: {
    label: 'Rating',
    description: 'Please provide your rating.',
  },
  RadioGroup: {
    label: 'Gender',
    description: 'Select your gender',
  }
}
