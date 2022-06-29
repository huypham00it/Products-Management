import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';

import { StateProvider } from './context/StateContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StateProvider>
        <App />
      </StateProvider>
  </React.StrictMode>
);
