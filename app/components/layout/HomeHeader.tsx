import { useEffect, useState } from 'react';
import { NavLink } from '@remix-run/react';

export default function HomeHeader() {
  const [url, setUrl] = useState('#');
  useEffect(() => {
    setUrl(window.ENV.BLOG_URL);
  }, []);

  const navList = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Projects',
      url: 'project'
    }
  ];

  const activeClassName = 'underline';
  return (
    <div className="px-16 py-6 text-right align-middle">
      <div className="space-x-4">
        {navList.map((nav) => {
          return (
            <NavLink
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
