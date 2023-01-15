import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'blackAlpha.50'
      },
      // styles for the `a`
      a: {
        _hover: {
          textDecoration: 'underline',
          fontWeight: 'bold'
        }
      }
    }
  },
  components: {
    Divider: {
      baseStyle: {
        borderColor: 'blackAlpha.400',
        borderWidth: '1px'
      }
    }
  }
});
