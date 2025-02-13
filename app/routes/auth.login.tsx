import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/server/auth.server';
import { adminPath } from '~/utils/router';

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await authenticator.isAuthenticated(request);

  const url = new URL(request.url);
  const returnTo = url.searchParams.get('redirect') ?? adminPath();

  if (profile) {
    throw redirect(returnTo);
  }

  return authenticator.authenticate('auth0', request, {
    successRedirect: returnTo,
    throwOnError: true,
  });
};
