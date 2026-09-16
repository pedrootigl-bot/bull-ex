"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BlogLoadingModal } from "./BlogLoadingModal";

const NAVIGATION_TIMEOUT_MS = 15000;
/** Navegação client-side pode ser instantânea; sem isso o modal só pisca. */
const MIN_VISIBLE_MS = 650;

type LoadingCopy = {
  title: string;
  subtitle: string;
};

type BlogNavigationContextValue = {
  startBlogNavigation: (copy?: LoadingCopy) => void;
  endBlogNavigation: () => void;
};

const BlogNavigationContext = createContext<BlogNavigationContextValue | null>(null);

export function BlogNavigationProvider({ children }: { children: ReactNode }) {
  const nav = useTranslations("navigation");
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState<LoadingCopy | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAtRef = useRef(0);

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    startedAtRef.current = 0;
    setIsLoading(false);
    setLoadingCopy(null);
  }, []);

  const endBlogNavigation = useCallback(() => {
    if (!startedAtRef.current) {
      close();
      return;
    }

    const remaining = MIN_VISIBLE_MS - (Date.now() - startedAtRef.current);
    if (remaining <= 0) {
      close();
      return;
    }

    if (closeTimerRef.current) {
      return;
    }

    closeTimerRef.current = setTimeout(close, remaining);
  }, [close]);

  const startBlogNavigation = useCallback((copy?: LoadingCopy) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    startedAtRef.current = Date.now();
    setLoadingCopy(copy ?? null);
    setIsLoading(true);
    timeoutRef.current = setTimeout(close, NAVIGATION_TIMEOUT_MS);
  }, [close]);

  // A tela nova já pintou: encerra o loading disparado pela navegação anterior.
  useEffect(() => {
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(endBlogNavigation);
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [pathname, endBlogNavigation]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (!anchor || anchor.hasAttribute("download")) {
        return;
      }

      const anchorTarget = anchor.getAttribute("target");
      if (anchorTarget && anchorTarget !== "_self") {
        return;
      }

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      const samePage =
        url.pathname === window.location.pathname && url.search === window.location.search;
      if (url.origin !== window.location.origin || samePage) {
        return;
      }

      startBlogNavigation({ title: nav("loadingTitle"), subtitle: nav("loadingSubtitle") });
    }

    // Captura: o Link do Next cancela o evento antes do bubbling chegar aqui.
    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [nav, startBlogNavigation]);

  const value = useMemo(
    () => ({
      startBlogNavigation,
      endBlogNavigation,
    }),
    [startBlogNavigation, endBlogNavigation],
  );

  return (
    <BlogNavigationContext.Provider value={value}>
      {children}
      <BlogLoadingModal
        open={isLoading}
        title={loadingCopy?.title}
        subtitle={loadingCopy?.subtitle}
      />
    </BlogNavigationContext.Provider>
  );
}

export function useBlogNavigation() {
  const context = useContext(BlogNavigationContext);
  if (!context) {
    throw new Error("useBlogNavigation must be used within BlogNavigationProvider");
  }
  return context;
}

/** Para componentes que também podem renderizar fora do provider. */
export function useOptionalBlogNavigation(): BlogNavigationContextValue | null {
  return useContext(BlogNavigationContext);
}
