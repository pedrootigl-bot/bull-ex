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

type BlogNavigationContextValue = {
  startBlogNavigation: () => void;
  endBlogNavigation: () => void;
};

const BlogNavigationContext = createContext<BlogNavigationContextValue | null>(null);

export function BlogNavigationProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const endBlogNavigation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const startBlogNavigation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
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
      <BlogLoadingModal open={isLoading} />
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
