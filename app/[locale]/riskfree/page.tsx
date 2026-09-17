"use client";

import { RISKFREE_PAGE_HREF } from "@/components/offers/offersConfig";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export default function RiskFreeLegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(RISKFREE_PAGE_HREF);
  }, [router]);

  return null;
}
