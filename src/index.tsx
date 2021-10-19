import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

import 'firebase/auth';
import { FirebaseProvider } from './modules/firebase/firebase-provider';
import { StoreProvider } from './modules/app/store/app-store-context';

ReactDOM.render(
  <FirebaseProvider>
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </FirebaseProvider>,
  document.getElementById('root'),
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
