import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import globalStylesUrl from '~/styles/global.css';
import tailwindStylesUrl from '~/styles/tailwind.css';

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

export default function App() {
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
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
