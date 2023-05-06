import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import ToastEx from './components/toastEx'
import WidgetTry from './components/dependencyWidget'
// import App2 from './App2'


ReactDOM.render(
  <React.StrictMode>
    < WidgetTry/>

  </React.StrictMode>,
  document.getElementById('root')
);
