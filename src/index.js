import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App';

if (module.hot) {
  module.hot.accept();
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
