import { Box } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box>
      <Sidebar />
      <Outlet max-height="100vh" />
    </Box>
  );
};

export default Layout;
