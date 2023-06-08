import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './chakra-ui/ColorModeSwitcher';
import Layout from './pages/layout/Layout';
import RouterError from './pages/error/RouteError';
import Dashboard from './pages/dashboard/Dashboard';
import CheckIn from './pages/checkIn/CheckIn';
import CheckOut from './pages/checkOut/CheckOut';
import Tickets from './pages/tickets/Tickets';
import UserProfile from './pages/userProfile/UserProfile';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
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
              </Route>
            </Route>
          </Routes>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
