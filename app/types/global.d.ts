import type { PublicEnv } from '~/server/config.public.server';

declare global {
  interface Window {
    ENV: PublicEnv;
  }
}
