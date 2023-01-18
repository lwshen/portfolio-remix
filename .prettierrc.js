module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  arrowParens: 'avoid',
  importOrder: ['^@(.*)$', '^react(.*)$', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
