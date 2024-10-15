import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './cartContext';

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById('root')
);
