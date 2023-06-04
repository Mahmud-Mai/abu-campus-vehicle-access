import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import RouterError from './pages/error/RouteError';
import Dashboard from './pages/dashboard/Dashboard';
import CheckIn from './pages/checkIn/CheckIn';
import CheckOut from './pages/checkOut/CheckOut';
import Tickets from './pages/tickets/Tickets';
import UserProfile from './pages/userProfile/UserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouterError />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/check-in',
        element: <CheckIn />,
      },
      {
        path: '/check-out',
        element: <CheckOut />,
      },
      {
        path: '/tickets',
        element: <Tickets />,
      },
      {
        path: '/account',
        element: <UserProfile />,
      },
    ],
  },
]);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
