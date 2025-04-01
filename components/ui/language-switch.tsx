"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

type Language = "fr" | "en"

interface LanguageSwitchProps {
  onLanguageChange?: (language: Language) => void
}

export default function LanguageSwitch({ onLanguageChange }: LanguageSwitchProps) {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "fr"
    }
    return "fr"
  })

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("language", language)
    onLanguageChange?.(language)
    console.log('languages ', language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("fr")}
          className={currentLanguage === "fr" ? "bg-accent" : ""}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={currentLanguage === "en" ? "bg-accent" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}