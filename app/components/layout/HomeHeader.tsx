import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';
import { json } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';

import { useEffect, useState } from 'react';

export const loader = async () => {
  let blogUrl = process.env.BLOG_URL;
  if (!blogUrl) {
    blogUrl = '/posts';
  }
  return json({
    BLOG_URL: blogUrl,
  });
};

export default function HomeHeader() {
  const { BLOG_URL } = useLoaderData<typeof loader>();
  const [url, setUrl] = useState('/posts');
  useEffect(() => {
    setUrl(window.ENV.BLOG_URL);
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

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
        <span>{BLOG_URL}</span>
        <Button variant="ghost" onClick={toggleColorMode}>
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </div>
  );
}
