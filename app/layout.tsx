import "./globals.css";

/**
 * Layout raiz mínimo (static export + next-intl).
 * O <html>/<body> ficam em app/[locale]/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
