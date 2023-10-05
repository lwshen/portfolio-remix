import { Link, Outlet, useLocation } from '@remix-run/react';

import { useRootData } from '~/hooks/useRootData';

export default function AdminPage() {
  const { profile } = useRootData();
  const location = useLocation();

  if (!profile) {
    return (
      <div>
        <Link to={`/auth/login?redirect=${location.pathname}`}>Login</Link>
      </div>
    );
  }
  return (
    <div>
      <Link to="/auth/logout">Logout</Link>
      <Link to="/admin/posts/new?view=full">Add new post</Link>
      <Outlet />
    </div>
  );
}
