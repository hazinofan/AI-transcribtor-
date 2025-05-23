import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon configuration */}
        <link rel="icon" href="/assets/favicon-qalamus.svg" type="image/svg+xml" />
        <link rel="icon" href="/assets/favicon-qalamus-32px.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/favicon-qalamus-32px.png" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
