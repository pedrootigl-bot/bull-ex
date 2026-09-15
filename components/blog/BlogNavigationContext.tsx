"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BlogLoadingModal } from "./BlogLoadingModal";

const NAVIGATION_TIMEOUT_MS = 15000;

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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState<LoadingCopy | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const endBlogNavigation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
    setLoadingCopy(null);
  }, []);

  const startBlogNavigation = useCallback((copy?: LoadingCopy) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLoadingCopy(copy ?? null);
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setLoadingCopy(null);
      timeoutRef.current = null;
    }, NAVIGATION_TIMEOUT_MS);
  }, []);

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
