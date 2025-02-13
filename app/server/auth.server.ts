import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';

import envConfig from '~/server/env.server';
import { sessionStorage } from '~/server/session.server';

export type User = {
  id: string;
  json: string;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

if (
  !envConfig.AUTH0_CLIENT_ID ||
  !envConfig.AUTH0_CLIENT_SECRET ||
  !envConfig.AUTH0_ISSUER_BASE_URL
) {
  throw new Error('Missing required Auth0 environment variables');
}

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: '/auth/callback/',
    clientID: envConfig.AUTH0_CLIENT_ID,
    clientSecret: envConfig.AUTH0_CLIENT_SECRET,
    domain: envConfig.AUTH0_ISSUER_BASE_URL,
  },
  async ({ profile }) => {
    if (!profile.id) {
      throw new Error('No profile ID');
    }

    return {
      id: profile.id,
      json: JSON.stringify(profile),
    };
  }
);

authenticator.use(auth0Strategy);
