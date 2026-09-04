"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { useBlogNavigation } from "./BlogNavigationContext";

type BlogNavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function BlogNavLink({ href, onClick, ...props }: BlogNavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { startBlogNavigation } = useBlogNavigation();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!href || href === pathname) {
      return;
    }

    event.preventDefault();
    startBlogNavigation();
    router.push(href);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
