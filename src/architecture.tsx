import React from 'react';
import ReactDOM from 'react-dom/client';
import ServiceApp from './servicePages/ServicePage';
import { ARCHITECTURE } from './servicePages/configs';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServiceApp config={ARCHITECTURE} />
  </React.StrictMode>,
);
