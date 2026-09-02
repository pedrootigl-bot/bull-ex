import type { HighlightItem } from "./highlightsConfig";
import styles from "./highlights.module.css";

function Laurel() {
  return (
    <svg className={styles.laurel} viewBox="0 0 120 72" fill="none" aria-hidden="true">
      <path
        d="M52 62c-8-3-18-12-22-24-3-9 1-22 10-28 2 8 1 16-3 22 7-6 12-15 12-24 6 7 8 17 5 26-6 14-14 22-22 28"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M40 22c3 4 4 9 3 13M34 32c4 3 6 8 6 12M30 44c5 2 9 6 11 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M68 62c8-3 18-12 22-24 3-9-1-22-10-28-2 8-1 16 3 22-7-6-12-15-12-24-6 7-8 17-5 26 6 14 14 22 22 28"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M80 22c-3 4-4 9-3 13M86 32c-4 3-6 8-6 12M90 44c-5 2-9 6-11 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HighlightIcon({ name }: { name: HighlightItem }) {
  switch (name) {
    case "execution":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <path d="M17.2 5 9 16.4h6.2L14.4 27 23 15.6h-6.2L17.2 5Z" stroke="#7cff3a" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "security":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <path d="M16 5 8 8.2v6.4c0 5 3.3 9 8 11.4 4.7-2.4 8-6.4 8-11.4V8.2L16 5Z" stroke="#7cff3a" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="m12.4 16.2 2.5 2.5 4.8-5" stroke="#7cff3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "access":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="9.2" stroke="#7cff3a" strokeWidth="1.6" />
          <path d="M7.2 16h17.6M16 6.8c2.6 2.8 4 6 4 9.2s-1.4 6.4-4 9.2c-2.6-2.8-4-6-4-9.2s1.4-6.4 4-9.2Z" stroke="#7cff3a" strokeWidth="1.5" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

export function HighlightMark({ name }: { name: HighlightItem }) {
  return (
    <div className={styles.mark}>
      <Laurel />
      <span className={styles.icon}>
        <HighlightIcon name={name} />
      </span>
    </div>
  );
}
