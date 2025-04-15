import { ChakraProvider as Provider, defaultSystem } from '@chakra-ui/react';

import React from 'react';

export const ChakraProvider = (props: { children: React.ReactNode }) => {
  return <Provider value={defaultSystem} {...props} />;
};
