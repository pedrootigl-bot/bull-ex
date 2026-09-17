import type { ReactNode } from "react";
import type { WhyFeatureId } from "./whyConfig";

type WhyIconName = WhyFeatureId | "bull";

function frame(children: ReactNode) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function WhyIcon({ name }: { name: WhyIconName }) {
  switch (name) {
    case "support":
      return frame(
        <>
          <path
            d="M6.5 12.2V11A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 17.5 11v1.2"
            stroke="#7CFF3A"
            strokeWidth="1.5"
          />
          <rect x="4.6" y="11.6" width="3.4" height="5.2" rx="1.2" stroke="#7CFF3A" strokeWidth="1.5" />
          <rect x="16" y="11.6" width="3.4" height="5.2" rx="1.2" stroke="#7CFF3A" strokeWidth="1.5" />
          <path
            d="M17.5 16.8c0 2-2.2 3.2-5.5 3.2"
            stroke="#7CFF3A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>,
      );
    case "promotions":
      return frame(
        <>
          <path
            d="M7.2 9.2h9.6v9.2H7.2V9.2Z"
            stroke="#7CFF3A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 9.2V7.6A2.8 2.8 0 0 1 12 4.8 2.8 2.8 0 0 1 14.8 7.6v1.6"
            stroke="#7CFF3A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M7.2 12.2h9.6" stroke="#7CFF3A" strokeWidth="1.5" strokeLinecap="round" />
        </>,
      );
    case "exclusive":
      return frame(
        <path
          d="M5.5 9.2 8.2 11l3.8-6 3.8 6 2.7-1.8-.8 8.6H6.3L5.5 9.2Z"
          stroke="#7CFF3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />,
      );
    case "bull":
      return (
        <svg viewBox="0 0 48 32" width="42" height="28" fill="none" aria-hidden="true">
          <path
            fill="#7CFF3A"
            d="M6 18.5c2.2-3.4 5.8-6.8 10.2-8.1-1.4-2.2-2-4.6-1.6-6.8 2.6 1.3 4.5 3.5 5.4 6.1 1.2-.2 2.4-.3 3.6-.3 1.4 0 2.8.1 4.1.4.8-2.7 2.6-5 5.2-6.4.5 2.2 0 4.6-1.3 6.8C35.8 11.6 39.6 15 42 18.5c-2.8 1.2-4.7 3.3-5.6 6H11.6c-1-2.7-2.9-4.8-5.6-6Z"
          />
        </svg>
      );
    default: {
      const exhaustive: never = name;
      return exhaustive;
    }
  }
}
