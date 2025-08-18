import { NavLink } from '@remix-run/react';

import { ColorModeButton } from '~/components/ui/color-mode';
import { useRootData } from '~/hooks/useRootData';

export default function HomeHeader() {
  const rootData = useRootData();

  const navList = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Projects',
      url: '/projects',
    },
  ];

  const activeClassName = 'underline';
  return (
    <div className="px-16 py-6 text-right align-middle">
      <div className="space-x-4 jin-bu-ti">
        {navList.map((nav, idx) => {
          return (
            <NavLink
              key={idx}
              to={nav.url}
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
            >
              {nav.label}
            </NavLink>
          );
        })}
        <a href={rootData.env.BLOG_URL}>Blog</a>
        <ColorModeButton />
      </div>
    </div>
  );
}
