import type { LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/server/auth.server';
import { adminPath } from '~/utils/router';

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.authenticate('auth0', request, {
    successRedirect: adminPath(),
    throwOnError: true,
  });
};
