import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
// CONVENTION POUR TOUTES LES PAGES Sans ce fichier : Next.js utilise son Document interne par défaut.
