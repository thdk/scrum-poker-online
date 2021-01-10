import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

import 'firebase/auth';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
