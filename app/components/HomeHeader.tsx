import { NavLink } from '@remix-run/react';

export default function HomeHeader() {
  const activeClassName = 'underline';
  return (
    <div className="h-8 p-6 pr-16 text-right align-middle">
      <div className="space-x-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
          Home
        </NavLink>
        <a href="https://slw.im">Blog</a>
      </div>
    </div>
  );
}
