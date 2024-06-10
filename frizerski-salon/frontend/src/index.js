import { UserProvider } from './components/UserContext';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import reportWebVitals from './reportWebVitals';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);

reportWebVitals();