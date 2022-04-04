import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <script type="text/javascript" async src="https://www.google-analytics.com/analytics.js"></script>

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo192-apple-touch.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Kochipad Dashboard" />
          <meta name="description" content="Kochipad Dashboard" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="keywords" content="Kochipad dashboard,Kochipad,Kochipad ui" />
          <meta name="geo.region" content="ID" />
          <meta name="geo.placename" content="Depok, West Java, Indonesia." />
          <meta name="og:type" content="website" />

          <meta name="og:image" content="/open-graph/og-img-small.png" />
          <meta property="og:image:alt" content="Kochipad Log Open Graph Big Version" />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="640" />

          <meta property="og:image:alt" content="Kochipad Dashboard Application Log Open Graph Small Version" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:site_name" content="Kochipad Dashboard" />

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
