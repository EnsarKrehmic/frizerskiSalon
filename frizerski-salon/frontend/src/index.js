import { createRoot } from 'react-dom/client';
import { React, StrictMode } from 'react';

import reportWebVitals from './reportWebVitals';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);

reportWebVitals();