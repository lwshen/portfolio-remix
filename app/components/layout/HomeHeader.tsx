import { useEffect, useState } from 'react';
import { NavLink } from '@remix-run/react';

export default function HomeHeader() {
  const [url, setUrl] = useState('#');
  useEffect(() => {
    setUrl(window.ENV.BLOG_URL);
  }, []);

  const activeClassName = 'underline';
  return (
    <div className="h-8 p-6 pr-16 text-right align-middle">
      <div className="space-x-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
          Home
        </NavLink>
        <a href={url}>Blog</a>
      </div>
    </div>
  );
}
