/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  trailingComma: 'es5',
  importOrder: [
    '^(react|react-query|react-dom|react-router(.*)|@/react(.*))$',
    '<THIRD_PARTY_MODULES>',
    '^@images/(.*)$',
    '^@/api/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/pages/(.*)$',
    '^@/(.*)$',
  ],
  order: 'concentric-css',
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindConfig: './tailwind.config.ts',
}
