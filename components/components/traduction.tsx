"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { translationValues } from "@/constants/translation"
import { Translation, Translations } from '@/constants/global-utils'


export default function Traduction() {

  const [translations, setTranslations] = React.useState<Translations>({ en: [], fr: [] });
  const [lang, setLang] = React.useState<"en" | "fr">("fr");
  React.useEffect(() => {
    const translations = translationValues
    setTranslations(translations)
  }, [])

  // Fonction pour mettre à jour une traduction
  const handleTranslationChange = (id: string, lang: "en" | "fr", newValue: string) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: prev[lang].map((t) =>
        t.id === id.toString() ? { ...t, value: newValue } : t
      )
    }));
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-[100px] text-left p-2 border-b">ID</th>
            <th className="w-[100px] text-left p-2 border-b">keys</th>
            <th className="text-left p-2 border-b">Français</th>
            <th className="text-left p-2 border-b">Anglais</th>
          </tr>
        </thead>
        <tbody>
          {translations.en.map((translation) => (
            <tr key={translation.id}>
              <td className="p-2 border">{translation.id}</td>
              <td className="p-2 border">
                <Input
                  value={translation.label}
                  onChange={(e) => handleTranslationChange(translation.id, lang, e.target.value)}
                />
              </td>
              <td className="p-2 border">
                <Input
                  value={translations.fr.find((t) => t.id === translation.id)?.value || ""}
                  onChange={(e) => handleTranslationChange(translation.id, "fr", e.target.value)}
                />
              </td>
              <td className="p-2 border">
                <Input
                  value={translations.en.find((t) => t.id === translation.id)?.value || ""}
                  onChange={(e) => handleTranslationChange(translation.id, "en", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}