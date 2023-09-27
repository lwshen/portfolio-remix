import serverEnv from './config.server';

/**
 * Environment variables we want to send to the UI inlined in the document.
 * Never use a private key here, because it will become public.
 **/
const env = {
  BLOG_URL: serverEnv.BLOG_URL,
  BEIAN: serverEnv.BEIAN,
} as const;

export default env;

export type PublicEnv = typeof env;
