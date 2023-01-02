export type Env = {
  BLOG_URL: string;
  BEIAN: string;
};

declare global {
  interface Window {
    ENV: Env;
  }
}
