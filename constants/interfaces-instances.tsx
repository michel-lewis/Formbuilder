import { Checkbox } from "@radix-ui/react-checkbox";
import { FormFieldCustomType } from "./interfarce";

export const formFieldsInstances: Record<string, FormFieldCustomType> = {

    'Checkbox': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "Checkbox",
            key: "Checkbox",
            fieldType: "boolean",
            inputType: "checkbox",
            type: "fields"
        },
        ui: { 
            label: "J'accepte les termes et conditions", 
            placeholder: "", 
            hint: "Veuillez cocher cette case pour continuer",
            className: "",
            disabled: false
        },
        cms: { 
            translatable: true, 
            translationKey: "form.accept_terms" 
        },
        validation: { 
            required: true,
            message: "Vous devez accepter les termes et conditions",
        }
    },
    'Combobox': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "Combobox", key: "Combobox", fieldType: "string", inputType: "select", options: [{ value: "1", label: "Option 1" }],
            type: "fields"
        },
        ui: { label: "Combobox", hint: "Sélectionner une option", className: "", disabled: false },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Date Picker': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "Date Picker", key: "Date Picker", fieldType: "date", inputType: "date",
            type: "fields"
        },
        ui: { label: "Date Picker", hint: "Sélectionner une date", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Datetime Picker': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "Datetime Picker", key: "Datetime Picker", fieldType: "datetime", inputType: "datetime-local",
            type: "fields"
        },
        ui: { label: "Datetime Picker", hint: "Sélectionner une date et heure", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'File Input': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "fileInput", key: "fileInput", fieldType: "file", inputType: "file",
            type: "fields"
        },
        ui: { label: "File Input", hint: "Téléchargez un fichier", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'Input': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "Input", key: "Input", fieldType: "string", inputType: "text", min: 0, max: 0,
            type: "fields"
        },
        ui: { 
            label: "Input", 
            hint: "Saisissez du texte", 
            className: "",
            disabled: false 
        },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Input OTP': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "inputOtp", key: "inputOtp", fieldType: "number", inputType: "text", maxLength: 6,
            type: "fields"
        },
        ui: { label: "OTP", hint: "XXXXXX", className: "" },
        cms: { translatable: false },
        validation: { required: true, minLength: 6, maxLength: 6 },
    },
    'Location Input': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "locationInput", key: "locationInput", fieldType: "location", inputType: "text",
            type: "fields"
        },
        ui: { label: "Localisation", hint: "Entrez une adresse", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Multi Select': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "multiSelect", key: "multiSelect", fieldType: "array", inputType: "select", options: [{ value: "opt1", label: "Option 1" }, { value: "opt2", label: "Option 2" }],
            type: "fields",
        },
        ui: { label: "Multi Select", hint: "Sélectionnez plusieurs options", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Password': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "password", key: "password", fieldType: "string", inputType: "password",
            type: "fields"
        },
        ui: { label: "Mot de passe", hint: "********", className: "" },
        cms: { translatable: false },
        validation: { required: true, minLength: 8 },
    },
    'Phone': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "phone", key: "phone", fieldType: "string", inputType: "tel",
            type: "fields"
        },
        ui: { label: "Numéro de téléphone", hint: "+33 6 12 34 56 78", className: "" },
        cms: { translatable: false },
        validation: { required: true, pattern: "^\\+?[0-9]{10,15}$" },
    },
    'Select': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "select", key: "select", fieldType: "string", inputType: "select", options: [{ value: "opt1", label: "Option 1" }],
            type: "fields"
        },
        ui: { label: "Select", hint: "Choisissez une option", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Signature Input': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "signatureInput", key: "signatureInput", fieldType: "file", inputType: "canvas",
            type: "fields"
        },
        ui: { label: "Signature", hint: "Signez ici", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'Slider': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "slider", key: "slider", fieldType: "number", inputType: "range", min: 0, max: 100,
            type: "fields"
        },
        ui: { label: "Slider", hint: "Glissez pour choisir une valeur", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'Smart Datetime Input': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "smartDatetimeInput", key: "smartDatetimeInput", fieldType: "datetime", inputType: "datetime-local",
            type: "fields"
        },
        ui: { label: "Smart Datetime", hint: "Sélectionnez une date et heure intelligente", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Switch': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "switch", key: "switch", fieldType: "boolean", inputType: "checkbox",
            type: "fields"
        },
        ui: { label: "Switch", hint: "Activer ou désactiver", className: "" },
        cms: { translatable: false },
        validation: { required: false },
    },
    'Tags Input': {
        children: [], // Required empty array for FormFieldCustomType
        technical: {
            id: "tagsInput", key: "tagsInput", fieldType: "array", inputType: "text",
            type: "fields"
        },
        ui: { label: "Tags", hint: "Ajoutez des tags", className: "" },
        cms: { translatable: true },
        validation: { required: false },
    },
    'Textarea': {
        children: [], // Required empty array for FormFieldCustomType
        technical: { 
            id: "textarea", 
            key: "textarea", 
            fieldType: "string", 
            inputType: "textarea", 
            maxLength: 500,
            type: "fields"
        },
        ui: { 
            label: "Texte long", 
            hint: "Écrivez votre texte ici", 
            className: "",
            disabled: false
        },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Rating': {
        children: [], // Required empty array for FormFieldCustomType
        technical: { 
            id: "rating", 
            key: "rating", 
            fieldType: "number", 
            inputType: "number", 
            min: 1, 
            max: 5,
            type: "fields"
        },
        ui: { 
            label: "Évaluation", 
            hint: "Donnez une note entre 1 et 5", 
            className: "",
            disabled: false
        },
        cms: { translatable: false },
        validation: { required: true },
    },
    'RadioGroup': {
        children: [], // Required empty array for FormFieldCustomType
        technical: { 
            id: "radioGroup", 
            key: "radioGroup", 
            fieldType: "string", 
            inputType: "radio", 
            options: [
                { value: "yes", label: "Oui" }, 
                { value: "no", label: "Non" }
            ],
            type: "fields"
        },
        ui: { 
            label: "Choix unique", 
            hint: "Sélectionnez une option", 
            className: "",
            disabled: false 
        },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Flex Row Panel': {
        children: [], // Adding required children property as empty array
        technical: {
            id: "flexRowPanel",
            key: "flexRowPanel",
            fieldType: "container",
            inputType: "panel",
            type: "panels" // Notez le type "panels" au lieu de "fields"
        },
        ui: { 
            label: "Flex Row Container", 
            className: "flex flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200",
            styleVariant: 'outlined'
        },
        cms: { 
            translatable: false
        },
        validation: { 
            required: false
        },
        layout: {
            gridColumnSpan: 12 // Prend toute la largeur par défaut
        }
    },
    'Three Column Row':{
        children: [], // Adding required children property as empty array
        technical: {
            id: "threeColumnRow",
            key: "threeColumnRow",
            fieldType: "container",
            inputType: "panel",
            type: "panels"
        },
        ui: { 
            label: "Three Column Row", 
            className: "grid grid-cols-3 gap-4 p-4 rounded-lg border-2 border-dashed border-gray-200 w-full",
            styleVariant: 'outlined'
        },
        cms: { 
            translatable: false
        },
        validation: { 
            required: false
        },
        layout: {
            gridColumnSpan: 12 // Prend toute la largeur par défaut
        }
    },

    'Two Column Row':{
        children: [], // Adding required children property as empty array
        technical: {
            id: "twoColumnRow",
            key: "twoColumnRow",
            fieldType: "container",
            inputType: "panel",
            type: "panels"
        },
        ui: { 
            label: "Two Column Row", 
            className: "grid grid-cols-2 gap-4 p-4 rounded-lg border-2 border-dashed border-gray-200",
            styleVariant: 'outlined'
        },
        cms: { 
            translatable: false
        },
        validation: { 
            required: false
        },
        layout: {
            gridColumnSpan: 12 // Prend toute la largeur par défaut
        }
    }
    
};