import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import App from './components/App/App';
import stores from './stores/stores';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
