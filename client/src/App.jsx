import React from 'react';
import { Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './chakra-ui/ColorModeSwitcher';
import Layout from './pages/layout/Layout';
import RouterError from './pages/error/RouteError';
import Dashboard from './pages/dashboard';
import CheckIn from './pages/checkIn';
import CheckOut from './pages/checkOut';
import Tickets from './pages/tickets';
import UserProfile from './pages/userProfile';
import { Route, Routes } from 'react-router-dom';
import Vehicles from './pages/vehicles';
import { ChakraUIProvider } from './chakra-ui/chakra-ui.provider';

function App() {
  return (
    <ChakraUIProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid height="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CheckIn />} />
              <Route errorElement={<RouterError />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/check-in" element={<CheckIn />} />
                <Route path="/check-out" element={<CheckOut />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/account" element={<UserProfile />} />
                <Route path="/vehicles" element={<Vehicles />} />
              </Route>
            </Route>
          </Routes>
        </Grid>
      </Box>
    </ChakraUIProvider>
  );
}

export default App;
