import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

import App from './App';
import { Provider } from './context/context';

import './index.css';

console.log(process.env);

ReactDOM.render(
  <SpeechProvider
    appId={process.env.REACT_APP_SPEECHLY_APP_ID}
    language={process.env.REACT_APP_SPEECHLY_LANGUAGE}
  >
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
