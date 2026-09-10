"use client";

import { useEffect } from "react";

/** Atualiza <html lang> conforme o locale da rota. */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
