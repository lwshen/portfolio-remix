/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*', '**/*.test.{ts,tsx}'],
  serverDependenciesToBundle: ['marked'],
  serverModuleFormat: 'cjs',
  postcss: true,
  // appDirectory: 'app',
  // assetsBuildDirectory: 'public/build',
  // serverBuildPath: 'build/index.js',
  // publicPath: '/build/',
};
