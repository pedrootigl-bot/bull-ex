export const HIGHLIGHT_ITEMS = ["execution", "security", "access"] as const;

export type HighlightItem = (typeof HIGHLIGHT_ITEMS)[number];
