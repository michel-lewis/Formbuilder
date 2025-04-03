import React, { useState, useEffect } from 'react'
import * as Locales from 'date-fns/locale'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { FormFieldType } from '@/types'
import If from '@/components/ui/if'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { translationValues } from "@/constants/translation"
import { Translation, Translations } from '@/constants/global-utils'
import { FormFieldCustomType } from "@/constants/interfarce"
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {  LuCheck, LuSettings, LuLayoutDashboard, LuCode, LuTable, LuEye, LuBug, LuCpu  } from 'react-icons/lu'
import { Bold } from 'lucide-react'


type EditFieldDialogProps = {
  isOpen: boolean
  onClose: () => void
  field: FormFieldCustomType | null
  onSave: (updatedField: FormFieldCustomType) => void
}

type Language = "fr" | "en";

type MenuItem = {
  id: string;
  label: string;
  icons: any
};

export const EditFieldDialog: React.FC<EditFieldDialogProps> = ({
  isOpen,
  onClose,
  field,
  onSave,
}) => {
  const [editedField, setEditedField] = useState<FormFieldCustomType | null>(null)
  const [customType, setCustomType] = useState<FormFieldCustomType>()
  const [fieldType, setFieldType] = useState<string>()
  const [language, setLanguage] = useState<Language>("fr")
  const [translations, setTranslations] = useState<Translations>({ en: [], fr: [] })
  const [activeMenu, setActiveMenu] = useState<string>('general')

  const menuItems: MenuItem[] = [
    { id: 'validations', label: 'Validations Rules', icons: <LuCheck size={14} fontSize={14} />  },
    { id: 'general', label: 'Général Props', icons: <LuSettings />   },
    { id: 'ui', label: 'UI', icons: <LuLayoutDashboard />   },
    { id: 'logic', label: 'Logic', icons: <LuCode />    },
    { id: 'data', label: 'Data Layout', icons: <LuTable />    },
    { id: 'accessibility', label: 'Accessibility', icons: <LuEye />   },
    { id: 'devonly', label: 'Dev Only', icons: <LuBug />   },
    { id: 'technical', label: 'Technical', icons: <LuCpu />  },
  ]

  const getTranslations = () => {
    const translations = translationValues;
    setTranslations(translations);
  };

  useEffect(() => {
    getTranslations();
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem("language") as Language || "fr";
      setLanguage(newLang);
      getTranslations();
    };

    handleLanguageChange();
    window.addEventListener("storage", handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const currentLang = localStorage.getItem("language") as Language || "fr";
    setLanguage(currentLang);
    getTranslations();
  }, [language]);

  useEffect(() => {
    setEditedField(field)
  }, [field])

  const handleSave = () => {
    if (editedField) {
      onSave(editedField)
      onClose()
    }
  }

  if (!editedField) return null

  const renderContent = () => {
    switch (activeMenu) {
      case 'validations':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">{editedField.technical.fieldType} Validation rules</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 p-3 rounded border">
                  <Checkbox
                    checked={editedField?.validation.required}
                    onCheckedChange={(checked) =>
                      setEditedField({
                        ...editedField,
                        validation: {
                          ...editedField.validation,
                          required: Boolean(checked)
                        }
                      })
                    }
                  />
                  <Label>{translations[language].find(t => t.id === 'Required')?.value || 'Required'}</Label>
                </div>
                <div className="flex items-center gap-2 p-3 rounded border">
                  <Checkbox
                    checked={editedField.ui.disabled}
                    onCheckedChange={(checked) =>
                      setEditedField({
                        ...editedField,
                        ui: {
                          ...editedField.ui,
                          disabled: Boolean(checked)
                        }
                      })
                    }
                  />
                  <Label>{translations[language].find(t => t.id === 'Disabled')?.value || 'Disabled'}</Label>
                </div>
              </div>

              <If condition={editedField.technical.inputType === 'Input' || editedField.technical.inputType === 'Textarea'}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Length</Label>
                    <Input
                      type="number"
                      value={editedField.technical.minLength}
                      onChange={(e) =>
                        setEditedField({
                          ...editedField,
                          technical: {
                            ...editedField.technical,
                            minLength: parseInt(e.target.value)
                          }
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Length</Label>
                    <Input
                      type="number"
                      value={editedField.technical.maxLength}
                      onChange={(e) =>
                        setEditedField({
                          ...editedField,
                          technical: {
                            ...editedField.technical,
                            maxLength: parseInt(e.target.value)
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </If>

              <div className="space-y-2">
                <Label>Custom Validation Message</Label>
                <Textarea
                  value={editedField.validation.message || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      validation: {
                        ...editedField.validation,
                        message: e.target.value
                      }
                    })
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'general':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Général {editedField.technical.fieldType} Field properties</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{translations[language].find(t => t.id === 'label')?.value || 'Label'}</Label>
                <Input
                  value={editedField.ui.label?.toString() || ""}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        label: e.target.value
                      }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>{translations[language].find(t => t.id === 'Description')?.value || 'Description'}</Label>
                <Input
                  value={editedField?.ui.hint?.toString() || ""}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        hint: e.target.value
                      }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>{translations[language].find(t => t.id === 'Placeholder')?.value || 'Placeholder'}</Label>
                <Input
                  value={editedField?.ui.placeholder?.toString() || ""}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField, 
                      ui: {
                        ...editedField.ui,
                        placeholder: e.target.value
                      }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>{translations[language].find(t => t.id === 'className')?.value || 'className'}</Label>
                <Input
                  value={editedField?.ui.className?.toString() || ""}
                  onChange={(e) =>
                    setEditedField({ 
                      ...editedField, 
                      ui: {
                        ...editedField.ui,
                        className: e.target.value
                      } 
                    })
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'ui':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">UI Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Visible</Label>
                <Switch
                  checked={!editedField.ui.hidden}
                  onCheckedChange={(checked) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        hidden: !checked
                      }
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Read Only</Label>
                <Switch
                  checked={editedField.ui.readOnly}
                  onCheckedChange={(checked) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        readOnly: checked
                      }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Icon Prefix</Label>
                <Input
                  value={editedField.ui.iconPrefix || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        iconPrefix: e.target.value
                      }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Icon Suffix</Label>
                <Input
                  value={editedField.ui.iconSuffix || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        iconSuffix: e.target.value
                      }
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={editedField.ui.size || 'medium'}
                  onValueChange={(value) =>
                    setEditedField({
                      ...editedField,
                      ui: {
                        ...editedField.ui,
                        size: value as "small" | "medium" | "large"
                      }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 'logic':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Logic Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Visible if</Label>
                {/* <Input
                  value={editedField.logic.defaultValue || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      logic: {
                        ...editedField.logic,
                        defaultValue: e.target.value
                      }
                    })
                  }
                /> */}
              </div>

              <div className="space-y-2">
                <Label>Conditional Logic</Label>
                {/* <Textarea
                  value={editedField.logic.conditional || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      logic: {
                        ...editedField.logic,
                        conditional: e.target.value
                      }
                    })
                  }
                  placeholder="Enter conditional logic expression"
                /> */}
              </div>

              <div className="space-y-2">
                <Label>Dynamic Options Query</Label>
                {/* <Input
                  value={editedField.logic.optionsQuery || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      logic: {
                        ...editedField.logic,
                        optionsQuery: e.target.value
                      }
                    })
                  }
                  placeholder="Enter API endpoint or query"
                /> */}
              </div>
            </div>
          </div>
        )

      case 'data':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Source Type</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Source Type</Label>
                <Select
                  value={editedField.data?.sourceType || 'string'}
                  onValueChange={(value) =>
                    setEditedField({
                      ...editedField,
                      data: {
                        ...editedField.data,
                        sourceType: value as 'static' | 'api' | 'database' 
                      }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Source type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">static</SelectItem>
                    <SelectItem value="number">api</SelectItem>
                    <SelectItem value="boolean">database</SelectItem>
                  </SelectContent>
                </Select>
              </div>

                {/* <div className="space-y-2">
                  <Label>Api Endpoints</Label>
                  <Input
                    value={editedField.data?.apiEndpoint || ''}
                    onChange={(e) =>
                      setEditedField({
                        ...editedField,
                        data: {
                          ...editedField.data,
                          apiEndpoint: e.target.value
                        }
                      })
                    }
                  /> 
                </div> */}

              <div className="space-y-2">
                <Label>Format</Label>
                {/* <Input
                  value={editedField.data.format || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      data: {
                        ...editedField.data,
                        format: e.target.value
                      }
                    })
                  } */}
                  {/* placeholder="e.g. YYYY-MM-DD for dates"
                /> */}
              </div>
            </div>
          </div>
        )

      case 'accessibility':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Accessibility Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ARIA Label</Label>
                {/* <Input
                  value={editedField.accessibility.ariaLabel || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      accessibility: {
                        ...editedField.accessibility,
                        ariaLabel: e.target.value
                      }
                    })
                  }
                /> */}
              </div>

              <div className="space-y-2">
                <Label>ARIA Described By</Label>
                {/* <Input
                  value={editedField.accessibility.ariaDescribedBy || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      accessibility: {
                        ...editedField.accessibility,
                        ariaDescribedBy: e.target.value
                      }
                    })
                  }
                /> */}
              </div>

              <div className="flex items-center justify-between">
                <Label>Tab Index</Label>
                {/* <Input
                  type="number"
                  className="w-20"
                  value={editedField.accessibility.tabIndex || 0}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      accessibility: {
                        ...editedField.accessibility,
                        tabIndex: parseInt(e.target.value)
                      }
                    })
                  }
                /> */}
              </div>
            </div>
          </div>
        )

      case 'devonly':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Developer Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Field ID</Label>
                <Input
                  value={editedField.technical.fieldType || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      technical: {
                        ...editedField.technical,
                        id: e.target.value
                      }
                    })
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>Custom CSS Class</Label>
                {/* <Input
                  value={editedField.dev.cssClass || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      dev: {
                        ...editedField.dev,
                        cssClass: e.target.value
                      }
                    })
                  }
                /> */}
              </div>

              <div className="space-y-2">
                <Label>Custom JavaScript</Label>
                {/* <Textarea
                  value={editedField.dev.customJS || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      dev: {
                        ...editedField.dev,
                        customJS: e.target.value
                      }
                    })
                  }
                  rows={5}
                /> */}
              </div>
            </div>
          </div>
        )

      case 'technical':
        return (
          <div className="py-4 space-y-4">
            <h3 className="text-lg font-semibold">Technical Settings</h3>
            <div className="space-y-4">
              <If condition={field?.technical.fieldType === 'Input'}>
                <div className="space-y-2">
                  <Label>Input Type</Label>
                  <Select
                    value={editedField.technical.inputType}
                    onValueChange={(value) => {
                      setFieldType(value)
                      setEditedField({
                        ...editedField,
                        technical: {
                          ...editedField.technical,
                          inputType: value
                        }
                      })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="tel">Telephone</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </If>

              <If condition={editedField.technical.inputType === 'number' || editedField.technical.inputType === 'text'}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Value</Label>
                    <Input
                      type="number"
                      value={editedField.technical.min}
                      onChange={(e) =>
                        setEditedField({
                          ...editedField,
                          technical: {
                            ...editedField.technical,
                            min: parseInt(e.target.value)
                          }
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      value={editedField.technical.max}
                      onChange={(e) =>
                        setEditedField({
                          ...editedField,
                          technical: {
                            ...editedField.technical,
                            max: parseInt(e.target.value)
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </If>

              <div className="space-y-2">
                <Label>Pattern (Regex)</Label>
                {/* <Input
                  value={editedField.technical.pattern || ''}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      technical: {
                        ...editedField.technical,
                        pattern: e.target.value
                      }
                    })
                  }
                  placeholder="Enter regular expression"
                /> */}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold">{activeMenu} Settings</h3>
            <p>Content for {activeMenu} will be displayed here</p>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] flex">
        {/* Sidebar Menu */}
        <div className="w-56 border-r pr-4 overflow-y-auto">
          <div className="space-y-1 sticky top-0">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeMenu === item.id ? "secondary" : "ghost"}
                className="w-full justify-start "
                onClick={() => setActiveMenu(item.id)}
              >
                {item.icons && (
              <span className="w-5 h-5 flex items-center justify-center">
                {item.icons}
              </span>
            )}
            <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pl-4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {translations[language].find(t => t.id === 'edit_field')?.value || 'Edit Field'} {editedField.technical.fieldType} Field
            </DialogTitle>
          </DialogHeader>
          
          {renderContent()}
          
          <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t">
            <Button onClick={handleSave}>
              {translations[language].find(t => t.id === 'Save changes')?.value || 'Save changes'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}