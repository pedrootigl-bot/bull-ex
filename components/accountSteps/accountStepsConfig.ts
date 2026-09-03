export const ACCOUNT_STEPS_COPY = {
  id: "criar-conta",
} as const;

export const ACCOUNT_STEPS = ["register", "verify", "start"] as const;

export type AccountStepId = (typeof ACCOUNT_STEPS)[number];

export type AccountStepIndex = 0 | 1 | 2;

export function isAccountStepIndex(value: number): value is AccountStepIndex {
  return value === 0 || value === 1 || value === 2;
}
