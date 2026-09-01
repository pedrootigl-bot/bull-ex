"use client";

import { useState } from "react";
import styles from "./legalNotice.module.css";

const NOTICE =
  "A Bullex não está autorizada pela Comissão Nacional do Mercado de Valores Mobiliários (CNMV) a oferecer publicamente ou intermediar valores mobiliários no Brasil. Ao acessar o site da Bullex, o usuário declara estar ciente e concordar com as restrições aqui indicadas. Para mais informações, consulte o Contrato do Cliente.";

export function LegalNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.bar} role="status">
      <p className={styles.text}>{NOTICE}</p>
      <button
        className={styles.close}
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Fechar aviso"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
