import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';
import * as React from 'react';

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
}
