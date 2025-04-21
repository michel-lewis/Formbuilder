import React, { useRef } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Files } from 'lucide-react'

import { renderFormField } from '@/screens/render-form-field'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import If from '@/components/ui/if'
import {
  generateZodSchema,
  generateFormCode,
  generateDefaultValues,
} from '@/screens/generate-code-parts'
import { formatJSXCode } from '@/lib/utils'
import { FormFieldCustomType } from '@/constants/interfarce'

export type FormFieldOrGroup = FormFieldCustomType | FormFieldCustomType[]

export type FormPreviewProps = {
  formFields: FormFieldOrGroup[]
}

const renderFormFields = (fields: FormFieldOrGroup[], form: any) => {
  console.log('Rendering form fields:', fields);
  return fields.map((fieldOrGroup, index) => {
    // Handle Panels
    if (!Array.isArray(fieldOrGroup) && fieldOrGroup.technical?.type === 'panels') {
      return (
        <div 
          key={fieldOrGroup.technical.id} 
          className={fieldOrGroup.ui.className || "p-4 rounded-lg border border-gray-200 bg-gray-50 mb-4"}
        >
          {/* <div className="font-medium mb-3">{fieldOrGroup.ui.label}</div> */}
          <div className={fieldOrGroup.ui.className?  fieldOrGroup.ui.className : 'flex flex-wrap gap-4'}>
            {fieldOrGroup.children?.map((child: FormFieldCustomType, childIndex: number) => {
              console.log('Panel child:', child);
              return (
                <FormField
                  key={`${fieldOrGroup.technical.id}-${childIndex}`}
                  control={form.control}
                  name={child.ui.label}
                  render={({ field: formField }) => {
                    const renderedField = renderFormField(child, form);
                    return (
                      <FormItem className={fieldOrGroup.ui.className?.includes('grid') ? '' : 'flex-1 min-w-[200px]'}>
                        <FormControl>
                          {renderedField ? React.cloneElement(
                            renderedField as React.ReactElement,
                            { ...formField }
                          ) : <div>Unsupported field type: {child.technical.fieldType}</div>}
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      )
    }
    
    // Handle Field Groups (arrays)
    if (Array.isArray(fieldOrGroup)) {
      const getColSpan = (totalFields: number) => {
        switch (totalFields) {
          case 2: return 6
          case 3: return 4
          default: return 12
        }
      }

      return (
        <div key={index} className="grid grid-cols-12 gap-4 mb-4">
          {fieldOrGroup.map((field, subIndex) => (
            <FormField
              key={`${index}-${subIndex}`}
              control={form.control}
              name={field.ui.label}
              render={({ field: formField }) => (
                <FormItem className={`col-span-${getColSpan(fieldOrGroup.length)}`}>
                  <FormControl>
                    {React.cloneElement(
                      renderFormField(field, form) as React.ReactElement,
                      { ...formField }
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
      )
    }

    // Handle Single Fields
    return (
      <FormField
        key={fieldOrGroup.technical.id}
        control={form.control}
        name={fieldOrGroup.ui.label}
        render={({ field: formField }) => (
          <FormItem className="col-span-12 mb-4">
            <FormControl>
              {React.cloneElement(
                renderFormField(fieldOrGroup, form) as React.ReactElement,
                { ...formField }
              )}
            </FormControl>
          </FormItem>
        )}
      />
    )
  })
}

export const FormPreview: React.FC<FormPreviewProps> = ({ formFields }) => {
  const formSchema = generateZodSchema(formFields)
  const defaultVals = generateDefaultValues(formFields)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultVals,
  })

  function onSubmit(data: any) {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>,
      )
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  const generatedCode = generateFormCode(formFields)
  const formattedCode = formatJSXCode(generatedCode)

  return (
    <div className="w-full h-full col-span-1 rounded-xl flex justify-center">
          <If
            condition={formFields.length > 0}
            render={() => (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 py-5 w-full max-w-6xl mx-auto border-2 border-dashed border-gray-300 rounded-lg p-6"
                >
                  {renderFormFields(formFields, form)}
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            )}
            otherwise={() => (
              <div className="h-screen w-full flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">
                <p>No form element selected yet.</p>
              </div>
            )}
          />
        
        {/* <TabsContent value="json">
          <If
            condition={formFields.length > 0}
            render={() => (
              <pre className="p-4 text-sm bg-secondary rounded-lg h-full md:max-h-[70vh] overflow-auto">
                {JSON.stringify(formFields, null, 2)}
              </pre>
            )}
            otherwise={() => (
              <div className="h-[50vh] flex justify-center items-center">
                <p>No form element selected yet.</p>
              </div>
            )}
          />
        </TabsContent>
        
        <TabsContent value="code">
          <If
            condition={formFields.length > 0}
            render={() => (
              <div className="relative">
                <Button
                  className="absolute right-2 top-2"
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(formattedCode)
                    toast.success('Code copied to clipboard!')
                  }}
                >
                  <Files className="w-4 h-4" />
                </Button>
                <Highlight
                  code={formattedCode}
                  language="tsx"
                  theme={themes.oneDark}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }: any) => (
                    <pre
                      className={`${className} p-4 text-sm bg-gray-100 rounded-lg h-full md:max-h-[70vh] overflow-auto`}
                      style={style}
                    >
                      {tokens.map((line: any, i: number) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token: any, key: any) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            )}
            otherwise={() => (
              <div className="h-[50vh] flex justify-center items-center">
                <p>No form element selected yet.</p>
              </div>
            )}
          />
        </TabsContent> */}
    </div>
  )
}