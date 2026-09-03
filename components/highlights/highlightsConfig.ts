export const PLATFORM_HIGHLIGHT_ITEMS = ["execution", "security", "access"] as const;

export type PlatformHighlightItem = (typeof PLATFORM_HIGHLIGHT_ITEMS)[number];

export type HighlightItem = PlatformHighlightItem;

export const TEAM_GRID_IMAGE = "/images/bullex-team-trading.jpg";
