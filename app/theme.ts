import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
    semanticTokens: {
      colors: {
        'body-bg': { value: { base: 'blakAlpha.50', _dark: 'gray.800' } },
        // foreground semantic tokens
        'body-fg': { value: { base: 'gray.800', _dark: 'gray.100' } },
      },
    },
  },
});

export const theme = createSystem(defaultConfig, config);

// export const system = extendTheme({
//   useSystemColorMode: true,
//   styles: {
//     global: {
//       // styles for the `body`
//       body: {
//         color: 'body-fg',
//         bg: 'body-bg',
//       },
//       // styles for the `a`
//       a: {
//         _hover: {
//           textDecoration: 'underline',
//         },
//       },
//     },
//   },
//   components: {
//     Divider: {
//       baseStyle: {
//         borderColor: 'blackAlpha.400',
//         borderWidth: '1px',
//       },
//     },
//   },
// });
