import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './chakra-ui/ColorModeSwitcher';
import Layout from './pages/layout/Layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Layout />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
