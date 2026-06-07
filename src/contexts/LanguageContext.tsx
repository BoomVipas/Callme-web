"use client";

import { createContext, useContext, useState } from "react";

type Lang = "en" | "th";

const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "en",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider
      value={{ lang, toggle: () => setLang((l) => (l === "en" ? "th" : "en")) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
