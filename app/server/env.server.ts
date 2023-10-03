import { parseEnv } from 'znv';
import { z } from 'zod';

export const env = parseEnv(process.env, {
  BLOG_URL: z.string().default('/posts'),
  BEIAN: z.string().default(''),

  // Authentication
  AUTH_SECRET: z.string().optional(),
  AUTH0_CLIENT_ID: z.string().optional(),
  AUTH0_CLIENT_SECRET: z.string().optional(),
  AUTH0_ISSUER_BASE_URL: z.string().optional(),
});

export default env;
