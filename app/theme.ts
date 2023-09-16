import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  useSystemColorMode: true,
  semanticTokens: {
    colors: {
      'body-bg': { default: 'blakAlpha.50', _dark: 'gray.800' },
      // foreground semantic tokens
      'body-fg': { default: 'gray.800', _dark: 'gray.100' },
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        color: 'body-fg',
        bg: 'body-bg',
      },
      // styles for the `a`
      a: {
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  components: {
    Divider: {
      baseStyle: {
        borderColor: 'blackAlpha.400',
        borderWidth: '1px',
      },
    },
  },
});
