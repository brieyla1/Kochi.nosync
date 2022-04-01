import '/styles/globals.css';
import 'tailwindcss/tailwind.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import ProgressLoad from 'components/ProgressLoad';
import { SidebarProvider } from 'src/context/SidebarContext';

import Navbar from 'components/Navbar';
import { Windmill } from '@windmill/react-ui';

import { ThemeProvider } from 'next-themes';

// SSR displays warnings without this
import React from 'react';
React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta name="yandex-verification" content="356dad746d43cc34" />

        <meta name="theme-color" content="#f0efeb" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png"></link>

        <title>Nextjs Windmill Dashboard</title>
        <meta name="description" content="Windmill Dashboard for nextjs" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.1.1/css/all.css" />
      </Head>

      <style jsx global>{`
        html {
          font-family: 'Roboto', sans-serif;
          scroll-behavior: smooth;
          scroll-behavior: smooth;
        }
      `}</style>

      <DefaultSeo />
      <ThemeProvider attribute="class">
        <SidebarProvider>
          <Windmill usePreferences={true}>
            <Navbar>
              <ProgressLoad />
              <Component {...pageProps} />
            </Navbar>
          </Windmill>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
