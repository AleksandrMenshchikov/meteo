import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() =>
  import('@/src/pages/home').then((m) => ({
    default: m.Home,
  })),
);
const NotFound = lazy(() =>
  import('@/src/pages/not-found').then((m) => ({
    default: m.NotFound,
  })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
