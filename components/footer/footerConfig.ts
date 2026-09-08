export const SUPPORT_EMAIL = "support@bull-ex.com";

export const FOOTER_LEGAL_DOCS = [
  {
    href: "/legal/general-fees-policy.pdf",
    labelKey: "feesPolicy",
  },
  {
    href: "/legal/withdrawal-policy.pdf",
    labelKey: "withdrawalPolicy",
  },
  {
    href: "/legal/aml-kyc-policy.pdf",
    labelKey: "amlKycPolicy",
  },
  {
    href: "/legal/promo-code-policy.pdf",
    labelKey: "promoCodePolicy",
  },
  {
    href: "/legal/refund-policy.pdf",
    labelKey: "refundPolicy",
  },
  {
    href: "/legal/demo-tournament-accounts.pdf",
    labelKey: "demoTournamentAccounts",
  },
  {
    href: "/legal/risk-disclosure.pdf",
    labelKey: "riskDisclosure",
  },
  {
    href: "/legal/order-execution-policy.pdf",
    labelKey: "orderExecutionPolicy",
  },
  {
    href: "/legal/cookies-policy.pdf",
    labelKey: "cookiesPolicy",
  },
] as const;

export type FooterLegalDocLabelKey = (typeof FOOTER_LEGAL_DOCS)[number]["labelKey"];
