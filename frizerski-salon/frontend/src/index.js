import { reportWebVitals } from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { React, StrictMode } from 'react';
import { App } from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

reportWebVitals();