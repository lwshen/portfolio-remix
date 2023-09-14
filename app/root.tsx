import { ChakraProvider } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { json } from '@remix-run/node';
import type { LinksFunction, LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import React, { useContext, useEffect } from 'react';

import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes';

import AppLayout from '~/components/layout/AppLayout';
import { ClientStyleContext, ServerStyleContext } from '~/context';
import { BEIAN, BLOG_URL } from '~/server/config.server';
import globalStylesUrl from '~/styles/global.css';
import tailwindStylesUrl from '~/styles/tailwind.css';
import { theme } from '~/theme';
import type { Env } from '~/types/global';

import { themeSessionResolver } from './sessions.server';

export const meta: V2_MetaFunction = () => [
  {
    charset: 'utf-8',
  },
  {
    viewport: 'width=device-width,initial-scale=1',
  },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: tailwindStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: globalStylesUrl,
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  return json({
    ENV: {
      BLOG_URL,
      BEIAN,
    } as Env,
    theme: getTheme(),
  });
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title = `Slinvent` }: DocumentProps, emotionCache) => {
    const data = useLoaderData<typeof loader>();
    const [theme] = useTheme();
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach(tag => {
        (emotionCache.sheet as any) // eslint-disable-line @typescript-eslint/no-explicit-any
          ._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <html lang="en" color-mode={theme ?? ''}>
        <head>
          <Meta />
          <title>{title}</title>
          <Links />
          <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ChakraProvider>
    </Document>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}
