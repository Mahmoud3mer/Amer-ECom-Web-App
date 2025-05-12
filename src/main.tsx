import { createRoot } from 'react-dom/client'
import '@styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from '@routes/AppRouter';
import { Provider } from 'react-redux';
import { store, persistor } from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
  ,
)
