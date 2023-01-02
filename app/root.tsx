import { json } from '@remix-run/node';
import type { MetaFunction, LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react';

import { BLOG_URL, BEIAN } from '~/server/config.server';
import globalStylesUrl from '~/styles/global.css';
import tailwindStylesUrl from '~/styles/tailwind.css';
import type { Env } from '~/types/global';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: tailwindStylesUrl
    },
    {
      rel: 'stylesheet',
      href: globalStylesUrl
    }
  ];
};

export async function loader() {
  return json({
    ENV: {
      BLOG_URL,
      BEIAN
    } as Env
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>Slinvent</title>
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
