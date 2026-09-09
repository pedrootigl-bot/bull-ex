import { redirect } from "next/navigation";

/**
 * Em static export o Next gera um shell de redirect frágil em `/`.
 * O script `scripts/prepare-dist.cjs` substitui `dist/index.html` por um
 * redirect HTML puro (meta + JS) compatível com Hostinger/FTP.
 */
export default function RootPage() {
  redirect("/pt-br/");
}
