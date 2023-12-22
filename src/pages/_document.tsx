import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#0b0b0b"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dooist" />
        <meta property="og:description" content="Easy Peasy Todo List" />
        <meta property="og:site_name" content="Dooist" />
        <meta property="og:url" content="https://dooist.vercel.app" />
        <meta
          property="og:image"
          content="https://dooist.vercel.app/icons/apple-touch-icon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
