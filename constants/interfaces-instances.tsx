import { Checkbox } from "@radix-ui/react-checkbox";
import { FormFieldCustomType } from "./interfarce";

export const formFieldsInstances: Record<string, FormFieldCustomType> = {

    'Checkbox': {
        technical: { 
            id: "Checkbox", 
            key: "Checkbox", 
            fieldType: "boolean", 
            inputType: "checkbox" 
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
        technical: { id: "Combobox", key: "Combobox", fieldType: "string", inputType: "select", options: [{ value: "1", label: "Option 1" }] },
        ui: { label: "Combobox", hint: "Sélectionner une option", className: "", disabled: false },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Date Picker': {
        technical: { id: "Date Picker", key: "Date Picker", fieldType: "date", inputType: "date" },
        ui: { label: "Date Picker", hint: "Sélectionner une date", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Datetime Picker': {
        technical: { id: "Datetime Picker", key: "Datetime Picker", fieldType: "datetime", inputType: "datetime-local" },
        ui: { label: "Datetime Picker", hint: "Sélectionner une date et heure", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'File Input': {
        technical: { id: "fileInput", key: "fileInput", fieldType: "file", inputType: "file" },
        ui: { label: "File Input", hint: "Téléchargez un fichier", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'Input': {
        technical: { id: "Input", key: "Input", fieldType: "string", inputType: "text", min: 0, max: 0 },
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
        technical: { id: "inputOtp", key: "inputOtp", fieldType: "number", inputType: "text", maxLength: 6 },
        ui: { label: "OTP", hint: "XXXXXX", className: "" },
        cms: { translatable: false },
        validation: { required: true, minLength: 6, maxLength: 6 },
    },
    'Location Input': {
        technical: { id: "locationInput", key: "locationInput", fieldType: "location", inputType: "text" },
        ui: { label: "Localisation", hint: "Entrez une adresse", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Multi Select': {
        technical: { id: "multiSelect", key: "multiSelect", fieldType: "array", inputType: "select", options: [{ value: "opt1", label: "Option 1" }, { value: "opt2", label: "Option 2" }] },
        ui: { label: "Multi Select", hint: "Sélectionnez plusieurs options", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Password': {
        technical: { id: "password", key: "password", fieldType: "string", inputType: "password" },
        ui: { label: "Mot de passe", hint: "********", className: "" },
        cms: { translatable: false },
        validation: { required: true, minLength: 8 },
    },
    'Phone': {
        technical: { id: "phone", key: "phone", fieldType: "string", inputType: "tel" },
        ui: { label: "Numéro de téléphone", hint: "+33 6 12 34 56 78", className: "" },
        cms: { translatable: false },
        validation: { required: true, pattern: "^\\+?[0-9]{10,15}$" },
    },
    'Select': {
        technical: { id: "select", key: "select", fieldType: "string", inputType: "select", options: [{ value: "opt1", label: "Option 1" }] },
        ui: { label: "Select", hint: "Choisissez une option", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Signature Input': {
        technical: { id: "signatureInput", key: "signatureInput", fieldType: "file", inputType: "canvas" },
        ui: { label: "Signature", hint: "Signez ici", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'Slider': {
        technical: { id: "slider", key: "slider", fieldType: "number", inputType: "range", min: 0, max: 100 },
        ui: { label: "Slider", hint: "Glissez pour choisir une valeur", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'Smart Datetime Input': {
        technical: { id: "smartDatetimeInput", key: "smartDatetimeInput", fieldType: "datetime", inputType: "datetime-local" },
        ui: { label: "Smart Datetime", hint: "Sélectionnez une date et heure intelligente", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Switch': {
        technical: { id: "switch", key: "switch", fieldType: "boolean", inputType: "checkbox" },
        ui: { label: "Switch", hint: "Activer ou désactiver", className: "" },
        cms: { translatable: false },
        validation: { required: false },
    },
    'Tags Input': {
        technical: { id: "tagsInput", key: "tagsInput", fieldType: "array", inputType: "text" },
        ui: { label: "Tags", hint: "Ajoutez des tags", className: "" },
        cms: { translatable: true },
        validation: { required: false },
    },
    'Textarea': {
        technical: { id: "textarea", key: "textarea", fieldType: "string", inputType: "textarea", maxLength: 500 },
        ui: { label: "Texte long", hint: "Écrivez votre texte ici", className: "" },
        cms: { translatable: true },
        validation: { required: true },
    },
    'Rating': {
        technical: { id: "rating", key: "rating", fieldType: "number", inputType: "number", min: 1, max: 5 },
        ui: { label: "Évaluation", hint: "Donnez une note entre 1 et 5", className: "" },
        cms: { translatable: false },
        validation: { required: true },
    },
    'RadioGroup': {
        technical: { id: "radioGroup", key: "radioGroup", fieldType: "string", inputType: "radio", options: [{ value: "yes", label: "Oui" }, { value: "no", label: "Non" }] },
        ui: { 
            label: "Choix unique", 
            hint: "Sélectionnez une option", 
            className: "",
            disabled: false 
        },
        cms: { translatable: true },
        validation: { required: true },
    },
};