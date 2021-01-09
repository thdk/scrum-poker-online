import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

import 'firebase/auth';

const urlParams = new URLSearchParams(window.location.search);

const sessionFromUrl = urlParams.get('session');

ReactDOM.render(<App
  sessionFromUrl={sessionFromUrl || undefined}
/>, document.getElementById('root'));

// if you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
