"use client";

import { SALDOPROMO_PAGE_HREF } from "@/components/offers/offersConfig";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export default function SaldoPromoLegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(SALDOPROMO_PAGE_HREF);
  }, [router]);

  return null;
}
