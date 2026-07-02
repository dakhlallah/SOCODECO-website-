import React from 'react';
import ReactDOM from 'react-dom/client';
import ServiceApp from './servicePages/ServicePage';
import { ENGINEERING } from './servicePages/configs';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServiceApp config={ENGINEERING} />
  </React.StrictMode>,
);
