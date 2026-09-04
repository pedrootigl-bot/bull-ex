"use client";

import { useEffect } from "react";
import { useBlogNavigation } from "./BlogNavigationContext";

export function BlogPageReady() {
  const { endBlogNavigation } = useBlogNavigation();

  useEffect(() => {
    function finish() {
      endBlogNavigation();
    }

    if (document.readyState === "complete") {
      requestAnimationFrame(() => {
        requestAnimationFrame(finish);
      });
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, [endBlogNavigation]);

  return null;
}
