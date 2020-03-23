import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { App } from 'components/app';


//this is necessary to allow us to inject environment variables to the window object at docker start
declare global {
    interface Window {
        REACT_APP_API_BASE?: string
    }
}

ReactDOM.render(
  <BrowserRouter>
        <CssBaseline />
            <App />
  </BrowserRouter>,
  document.querySelector('#root')
);