import * as ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import RouterError from './pages/error/RouteError';
import { chakraCustomTheme as theme } from './chakra-ui/chakra-ui.custom-theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<App />} errorElement={<RouterError />} />
  )
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
