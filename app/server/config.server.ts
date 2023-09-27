/* SERVER CONFIG */
const env = {
  BLOG_URL: process.env.BLOG_URL || '/posts',
  BEIAN: process.env.BEIAN || '',

  // Authentication
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
};

export type ServerEnv = typeof env;

export default env;
