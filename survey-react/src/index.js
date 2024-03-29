import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import createRoutes from './routes';

import { fetch as fetchPolyfill } from 'whatwg-fetch'

if (!window.fetch) {
  window.fetch = fetchPolyfill
}

ReactDOM.render(createRoutes(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
