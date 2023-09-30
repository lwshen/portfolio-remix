import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { json } from '@remix-run/node';
import type { DataFunctionArgs, LinksFunction, MetaFunction } from '@remix-run/node';
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

import { withDevTools } from 'remix-development-tools';
import rdtStylesheet from 'remix-development-tools/index.css';

import AppLayout from '~/components/layout/AppLayout';
import { ClientStyleContext, ServerStyleContext } from '~/context';
import type { PublicEnv } from '~/server/config.public.server';
import env from '~/server/config.public.server';
import globalStylesUrl from '~/styles/global.css';
import tailwindStylesUrl from '~/styles/tailwind.css';
import { theme } from '~/theme';

import { getUserProfile } from './server/profile.server';

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
  },
  {
    viewport: 'width=device-width,initial-scale=1',
  },
];

export const links: LinksFunction = () => {
  const links = [
    {
      rel: 'stylesheet',
      href: tailwindStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: globalStylesUrl,
    },
  ];
  if (process.env.NODE_ENV === 'development') {
    links.push({ rel: 'stylesheet', href: rdtStylesheet });
  }
  return links;
};

export const loader = async (ctx: DataFunctionArgs) => {
  const profile = await getUserProfile(ctx);
  return json({
    env,
    profile,
    cookies: ctx.request.headers.get('Cookie') ?? '',
  });
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title = `Slinvent` }: DocumentProps, emotionCache) => {
    const data = useLoaderData<{ env: PublicEnv; cookies: string }>();
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
      <AppLayout>
        <Outlet />
      </AppLayout>
    </Document>
  );
}

let AppExport = App;
// This imports the dev tools only if you're in development
if (process.env.NODE_ENV === 'development') {
  AppExport = withDevTools(AppExport);
}

export default AppExport;
