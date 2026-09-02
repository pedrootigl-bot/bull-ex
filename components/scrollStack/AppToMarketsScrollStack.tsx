import { MarketsSection } from "@/components/markets/MarketsSection";
import { MobileAppSection } from "@/components/mobileApp/MobileAppSection";
import styles from "./scrollStack.module.css";

export function AppToMarketsScrollStack() {
  return (
    <div className={styles.stack}>
      <div className={styles.pin}>
        <MobileAppSection />
      </div>
      <div className={styles.cover}>
        <MarketsSection />
      </div>
    </div>
  );
}
