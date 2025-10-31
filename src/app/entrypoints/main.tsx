import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/src/app/styles/global.css';
import { router } from '@/src/app/routes/router.tsx';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@/src/shared/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
