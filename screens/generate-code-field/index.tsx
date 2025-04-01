import { FormFieldCustomType } from '@/constants/interfarce'
import { FormFieldType } from '@/types'

export const generateCodeSnippet = (field: FormFieldCustomType) => {
  switch (field.technical.id) {
    case 'Checkbox':
      return `<FormField
          control={form.control}
          name="${field.ui.label}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ${field.validation.disabled ? 'disabled' : ''}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>${field.technical.id}</FormLabel>
                ${
                  field.ui.hint &&
                  `<FormDescription>${field.ui.hint}</FormDescription>`
                }
                <FormMessage />
              </div>
            </FormItem>
          )}
        />`
    case 'Combobox':
      return `<FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>${field.ui.label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      ${field.validation.required ? 'disabled' : ''}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("${field.ui.label}", language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Date Picker':
      return `
      <FormField
      control={form.control}
      name="${field.technical.id}"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>${field.ui.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
       ${
         field.ui.hint &&
         `<FormDescription>${field.ui.hint}</FormDescription>`
       }
          <FormMessage />
        </FormItem>
      )}
    />`
    case 'Datetime Picker':
      return `
      <FormField
      control={form.control}
      name="${field.technical.id}"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>${field.ui.label}</FormLabel>
          <DatetimePicker
            {...field}
            format={[
              ["months", "days", "years"],
              ["hours", "minutes", "am/pm"],
            ]}
          />
       ${
         field.ui.hint &&
         `<FormDescription>${field.ui.hint}</FormDescription>`
       }
          <FormMessage />
        </FormItem>
      )}
    />`
    case 'Input':
      return `
        <FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.ui.label}</FormLabel>
              <FormControl>
                <Input 
                placeholder="${field.ui.hint}"
                ${field.validation.disabled ? 'disabled' : ''}
                type="${field.technical.inputType}"
                {...field} />
              </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Input OTP':
      return `
       <FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.ui.label}</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Location Input':
      return `
           <FormField
              control={form.control}
              name="${field.technical.id}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${field.ui.label}</FormLabel>
                  <FormControl>
                  <LocationSelector
                    onCountryChange={(country) => {
                      setCountryName(country?.name || '')
                      form.setValue(field.technical.id, [country?.name || '', stateName || ''])
                    }}
                    onStateChange={(state) => {
                      setStateName(state?.name || '')
                      form.setValue(field.technical.id, [form.getValues(field.technical.id)[0] || '', state?.name || ''])
                    }}
                  />
                  </FormControl>
                  ${
                    field.ui.hint &&
                    `<FormDescription>${field.ui.hint}</FormDescription>`
                  }
                  <FormMessage />
                </FormItem>
              )}
            />`
    case 'Multi Select':
      return `
           <FormField
              control={form.control}
              name="${field.technical.id}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${field.ui.label}</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select languages" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                        <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                        <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
                      </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  ${
                    field.ui.hint &&
                    `<FormDescription>${field.ui.hint}</FormDescription>`
                  }
                  <FormMessage />
                </FormItem>
              )}
            />`
    case 'Select':
      return `
        <FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.ui.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="${field.ui.hint}" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
                ${
                  field.ui.hint &&
                  `<FormDescription>${field.ui.hint}</FormDescription>`
                }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Slider':
      return `
            <FormField
              control={form.control}
              name="${field.technical.id}"
              render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Price - {value}</FormLabel>
                <FormControl>
                  <Slider
                    min=${field.technical.min ? field.technical.min : '{0}'}
                    max=${field.technical.max ? field.technical.max : '{100}'}
                    // step=${field.technical.step ? field.technical.step : '{5}'}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                ${
                  field.ui.hint &&
                  `<FormDescription>${field.ui.hint}</FormDescription>`
                }
                <FormMessage />
              </FormItem>
              )}
            />`
    case 'Signature Input':
      return `<FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
          <FormItem>
            <FormLabel>${field.ui.label}</FormLabel>
            <FormControl>
            <SignatureInput
              canvasRef={canvasRef}
              onSignatureChange={field.onChange}
            />
            </FormControl>
            ${
              field.ui.hint &&
              `<FormDescription>${field.ui.hint}</FormDescription>`
            }
            <FormMessage />
          </FormItem>
          )}
        />`
    case 'Smart Datetime Input':
      return `
            <FormField
              control={form.control}
              name="${field.technical.id}"
              render={({ field }) => (
              <FormItem>
                <FormLabel>${field.ui.label}</FormLabel>
                <FormControl>
                  <SmartDatetimeInput
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="e.g. Tomorrow morning 9am"
                    ${field.ui.locale ? `locale={${field.ui.locale}}` : ''}
                    ${`hour12`}
                  />
                </FormControl>
                ${
                  field.ui.hint &&
                  `<FormDescription>${field.ui.hint}</FormDescription>`
                }
                <FormMessage />
              </FormItem>
              )}
            />`
    case 'Switch':
      return `
          <FormField
              control={form.control}
              name="${field.technical.id}"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>${field.ui.label}</FormLabel>
                    ${
                      field.ui.hint &&
                      `<FormDescription>${field.ui.hint}</FormDescription>`
                    }
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />`
    case 'Tags Input':
      return `
        <FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.ui.label}</FormLabel>
              <FormControl>
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Textarea':
      return `
        <FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.ui.label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="${field.ui.hint}"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'File Input':
      return `
            <FormField
              control={form.control}
              name="${field.technical.id}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${field.ui.label}</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className="relative bg-background rounded-lg p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                          <CloudUpload className='text-gray-500 w-10 h-10' />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  ${field.ui.hint ? `<FormDescription>${field.ui.hint}</FormDescription>` : ''}
                  <FormMessage />
                </FormItem>
              )}
            />`
    case 'Password':
      return `
        <FormField
          control={form.control}
          name="${field.technical.id}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.ui.label}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="${field.ui.hint}" {...field} />
              </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />
        `
    case 'Phone':
      return `
          <FormField
            control={form.control}
            name="${field.technical.id}"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>${field.ui.label}</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="${field.ui.hint}"
                    {...field}
                    defaultCountry="TR"
                  />
                </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
                <FormMessage />
              </FormItem>
            )}
          />
            `
    case 'Rating':
      return `
          <FormField
            control={form.control}
            name="${field.technical.id}"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>${field.ui.label}</FormLabel>
                <FormControl className="w-full">
                  <Rating {...field} />
                </FormControl>
              ${
                field.ui.hint &&
                `<FormDescription>${field.ui.hint}</FormDescription>`
              }
                <FormMessage />
              </FormItem>
            )}
          />
            `
    case 'RadioGroup':
      return `
          <FormField
            control={form.control}
            name="${field.technical.id}"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>${field.ui.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {[
                      ["Male", "male"],
                      ["Female", "female"],
                      ["Other", "other"]
                    ].map((option, index) => (
                      <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                ${
                  field.ui.hint &&
                  `<FormDescription>${field.ui.hint}</FormDescription>`
                }
                <FormMessage />
              </FormItem>
            )}
          />
        `
    default:
      return null
  }
}

export default function GenerateCodeFields() {
  return <div>index</div>
}
