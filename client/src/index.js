import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import reducers from './reducers';
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
const googleId = process.env.REACT_APP_API_KEY;

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleId}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
