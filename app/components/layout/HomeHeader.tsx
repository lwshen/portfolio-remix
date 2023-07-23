import type { LinksFunction } from '@remix-run/node';
import { NavLink } from '@remix-run/react';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import styles from '~/styles/components/home-header.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function HomeHeader({
  setMode,
  mode,
}: {
  setMode: Dispatch<SetStateAction<string>>;
  mode: string;
}) {
  const [url, setUrl] = useState('/posts');
  useEffect(() => {
    setUrl(window.ENV.BLOG_URL);
  }, []);

  const handleDarkMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
  };

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
      <div className="space-x-4 jin-bu-ti link">
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
        <a className="link" href={url}>
          Blog
        </a>
        <span className="icon" onClick={handleDarkMode}>
          {mode}
        </span>
      </div>
    </div>
  );
}
