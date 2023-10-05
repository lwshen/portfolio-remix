import { useSearchParams } from '@remix-run/react';

import type { ReactNode } from 'react';
import { Fragment } from 'react';

import HomeFooter from '~/components/layout/HomeFooter';
import HomeHeader from '~/components/layout/HomeHeader';

export interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');

  return (
    <Fragment>
      <HomeHeader />
      <div
        style={{
          lineHeight: '1.4',
          margin: '0 auto',
          padding: '0 40px',
          maxWidth: view === 'full' ? undefined : '820px',
        }}
      >
        {children}
      </div>
      <HomeFooter />
    </Fragment>
  );
}
