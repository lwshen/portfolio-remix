import { NavLink } from '@remix-run/react';

import { useEffect, useState } from 'react';

export default function HomeHeader() {
  const [url, setUrl] = useState('/posts');
  useEffect(() => {
    setUrl(window.ENV.BLOG_URL);
  }, []);

  const navList = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Projects',
      url: 'project',
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
        <a href={url}>Blog</a>
      </div>
    </div>
  );
}
