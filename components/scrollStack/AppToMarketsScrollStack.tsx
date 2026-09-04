import { MarketsSection } from "@/components/markets/MarketsSection";
import { MobileAppSection } from "@/components/mobileApp/MobileAppSection";
import styles from "./scrollStack.module.css";

type AppToMarketsScrollStackProps = {
  groupClassName?: string;
  mobileAppClassName?: string;
  marketsClassName?: string;
};

export function AppToMarketsScrollStack({
  groupClassName,
  mobileAppClassName,
  marketsClassName,
}: AppToMarketsScrollStackProps) {
  return (
    <div className={[styles.stack, groupClassName].filter(Boolean).join(" ")}>
      <div className={[styles.pin, mobileAppClassName].filter(Boolean).join(" ")}>
        <MobileAppSection />
      </div>
      <div className={[styles.cover, marketsClassName].filter(Boolean).join(" ")}>
        <MarketsSection />
      </div>
    </div>
  );
}
