import { Fragment } from 'react';
import HomeHeader from '~/components/layout/HomeHeader';
import HomeFooter from '~/components/layout/HomeFooter';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Fragment>
      <HomeHeader />
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
    </Fragment>
  );
}
