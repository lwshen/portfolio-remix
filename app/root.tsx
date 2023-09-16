import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react';
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

import React, { useContext, useEffect, useMemo } from 'react';

import AppLayout from '~/components/layout/AppLayout';
import { ClientStyleContext, ServerStyleContext } from '~/context';
import { BEIAN, BLOG_URL } from '~/server/config.server';
import globalStylesUrl from '~/styles/global.css';
import tailwindStylesUrl from '~/styles/tailwind.css';
import { theme } from '~/theme';
import type { Env } from '~/types/global';

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
  return json({
    ENV: {
      BLOG_URL,
      BEIAN,
    } as Env,
    cookies: request.headers.get('cookie') ?? '',
  });
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title = `Slinvent` }: DocumentProps, emotionCache) => {
    const data = useLoaderData<typeof loader>();
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    function getColorMode(cookies: string) {
      const match = cookies.match(new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`));
      return match == null ? void 0 : match[2];
    }

    // here we can set the default color mode. If we set it to null,
    // there's no way for us to know what is the the user's preferred theme
    // so the cient will have to figure out and maybe there'll be a flash the first time the user visits us.
    const DEFAULT_COLOR_MODE: 'dark' | 'light' | null = 'light';

    const CHAKRA_COOKIE_COLOR_KEY = 'chakra-ui-color-mode';

    // the client get the cookies from the document
    // because when we do a client routing, the loader can have stored an outdated value
    if (typeof document !== 'undefined') {
      data.cookies = document.cookie;
    }

    // get and store the color mode from the cookies.
    // It'll update the cookies if there isn't any and we have set a default value
    let colorMode = useMemo(() => {
      let color = getColorMode(data.cookies);

      if (!color && DEFAULT_COLOR_MODE) {
        data.cookies += ` ${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
        color = DEFAULT_COLOR_MODE;
      }

      return color;
    }, [data]);

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
      <html
        lang="en"
        {...(colorMode && {
          'data-theme': colorMode,
          style: { colorScheme: colorMode },
        })}
      >
        <head>
          <Meta />
          <title>{title}</title>
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body
          {...(colorMode && {
            className: `chakra-ui-${colorMode}`,
          })}
        >
          <ChakraProvider colorModeManager={cookieStorageManagerSSR(data.cookies)} theme={theme}>
            {children}
          </ChakraProvider>
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

export default function App() {
  return (
    <Document>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Document>
  );
}
