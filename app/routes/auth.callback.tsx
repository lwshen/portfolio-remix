import type { LoaderFunction } from '@remix-run/node';

import { authenticator } from '~/server/auth.server';

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/',
    throwOnError: true,
  });
};
