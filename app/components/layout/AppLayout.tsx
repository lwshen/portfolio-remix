import type { LinksFunction } from '@remix-run/node';

import React from 'react';
import type { ReactNode } from 'react';

import HomeFooter from '~/components/layout/HomeFooter';
import HomeHeader, { links as headerLinks } from '~/components/layout/HomeHeader';

export const links: LinksFunction = () => {
  return [...headerLinks()];
};

export interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    if (localStorage.getItem('mode')) {
      setMode(localStorage.getItem('mode') ?? 'light');
    }
  }, []);

  return (
    <div className="layout" color-mode={mode}>
      <HomeHeader setMode={setMode} mode={mode} />
      <div
        style={{
          lineHeight: '1.4',
          margin: '0 auto',
          padding: '0 40px',
          maxWidth: '820px',
        }}
      >
        {children}
      </div>
      <HomeFooter />
    </div>
  );
}
