"use client";

import { TICKETS_OFFER_PAGE_HREF } from "@/components/offers/offersConfig";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export default function TicketsLegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(TICKETS_OFFER_PAGE_HREF);
  }, [router]);

  return null;
}
