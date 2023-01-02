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
      {children}
      <HomeFooter />
    </Fragment>
  );
}
