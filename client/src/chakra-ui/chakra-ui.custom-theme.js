// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export const chakraCustomTheme = extendTheme({
  config,
});
