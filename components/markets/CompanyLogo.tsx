import type { ReactNode } from "react";
import type { MarketItem } from "./marketsConfig";

type LogoProps = {
  name: MarketItem["logo"];
};

function mark(children: ReactNode) {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      {children}
    </svg>
  );
}

export function CompanyLogo({ name }: LogoProps) {
  switch (name) {
    case "apple":
      return mark(
        <path
          fill="#fff"
          d="M20.4 8.4c-.6.8-1.6 1.4-2.6 1.3-.1-1 .3-2 .9-2.7.6-.8 1.7-1.4 2.6-1.4.1 1-.3 2-.9 2.8Zm2.3 1.6c-1.6-.1-3 .9-3.7.9s-2-.9-3.4-.8c-1.7.1-3.3 1-4.2 2.6-1.8 3.1-.5 7.8 1.3 10.3.9 1.3 1.9 2.6 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.2-2.6.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.8 0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8Z"
        />,
      );
    case "tesla":
      return mark(
        <path fill="#e82127" d="M6 11.2 16 8l10 3.2-1.2 3.2H18.4V24h-4.8V14.4H7.2L6 11.2Zm10-1.4c2.6 0 5.4.4 8 .9L16 8.4 8 10.7c2.6-.6 5.4-1 8-.9Z" />,
      );
    case "nvidia":
      return mark(
        <path fill="#76b900" d="M8 22c6.2-5.4 10.4-7.2 16.6-8.1C20.8 8 14.6 7.2 8 11.8V22Zm16.8-9.4C18.4 14 14 16.2 8.4 22c6.8.2 12.4-2.4 16.4-9.4Z" />,
      );
    case "microsoft":
      return mark(
        <>
          <rect x="6" y="6" width="9" height="9" fill="#f25022" />
          <rect x="17" y="6" width="9" height="9" fill="#7fba00" />
          <rect x="6" y="17" width="9" height="9" fill="#00a4ef" />
          <rect x="17" y="17" width="9" height="9" fill="#ffb900" />
        </>,
      );
    case "amazon":
      return mark(
        <>
          <path fill="#fff" d="M9 12h2.2c1.8 0 3 .9 3 2.4 0 1.6-1.3 2.6-3.2 2.6H11v2.4H9V12Zm2.2 3.4c.8 0 1.2-.4 1.2-1s-.4-1-1.2-1H11v2h.2ZM16.2 12h2.1l2.3 6.2L23 12h2.1l-3.4 8.4h-2.1L16.2 12Z" />
          <path d="M8 24c4.4 2.2 11.6 2.2 16 0" stroke="#ff9900" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>,
      );
    case "google":
      return mark(
        <path
          fill="#fff"
          d="M16.2 15.4v3.1h6.1c-.3 1.5-1.9 4.4-6.1 4.4-3.7 0-6.7-3-6.7-6.9s3-6.9 6.7-6.9c2.1 0 3.5.9 4.3 1.6l2.2-2.1C21.3 7.2 19 6.2 16.2 6.2 10.8 6.2 6.4 10.6 6.4 16s4.4 9.8 9.8 9.8c5.7 0 9.4-4 9.4-9.6 0-.6 0-1.1-.1-1.6h-9.3Z"
        />,
      );
    case "meta":
      return mark(
        <path
          fill="#66d1ff"
          d="M21.8 10.4c-.8-1.5-2.6-2.2-4.4-1.6-1.2.4-2 1.2-2.6 2.2-.6-1-1.4-1.8-2.6-2.2-1.8-.6-3.6.1-4.4 1.6-.9 1.8-.4 4.1 1.8 7.3 1.4 2 2.8 3.3 3.3 3.6.3.2.6.2.9 0 .5-.3 1.9-1.6 3.3-3.6 2.2-3.2 2.7-5.5 1.7-7.3Z"
        />,
      );
    case "bitcoin":
      return mark(
        <>
          <circle cx="16" cy="16" r="11" fill="#f7931a" />
          <path
            fill="#fff"
            d="M17.6 16.6c1.4-.4 2.3-1.2 2.1-2.6-.2-1.4-1.4-1.9-3.1-2v-2h-1.4v1.9h-1.1V10h-1.4v1.9H11v1.6h1.1c.6 0 .8.2.8.7v4.4c0 .5-.2.8-.8.8H11v1.6h1.6V22h1.4v-1.6h1.1V22h1.4v-1.6c2 .2 3.5-.4 3.8-2.1.2-1.2-.4-2-1.8-2.3Zm-3.7-3.6c0-.4.2-.6.8-.6h1.5c.9 0 1.5.3 1.6 1.1.1.7-.4 1.1-1.4 1.1h-1.7c-.6 0-.8-.2-.8-.6v-1Zm2.7 5.8h-1.9c-.6 0-.8-.2-.8-.7v-1.3c0-.4.2-.6.8-.6h2.1c1.1 0 1.6.4 1.5 1.3-.1.8-.7 1.3-1.7 1.3Z"
          />
        </>,
      );
    case "ethereum":
      return mark(
        <>
          <path fill="#fff" d="M16 6.5 9.5 16.2 16 20l6.5-3.8L16 6.5Z" />
          <path fill="#a7a7a7" d="M16 6.5v13.5l6.5-3.8L16 6.5Z" />
          <path fill="#fff" d="M16 21.2 9.5 17.3 16 25.5l6.5-8.2-6.5 3.9Z" />
        </>,
      );
    case "petrobras":
      return mark(
        <path fill="#00a859" d="M8 22c0-6.2 3.4-10.8 8-12.8 4.6 2 8 6.6 8 12.8H8Z" />,
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}
