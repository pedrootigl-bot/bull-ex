export const TEAM_GRID_STATS = ["deposit", "investment"] as const;

export type TeamGridStatId = (typeof TEAM_GRID_STATS)[number];
