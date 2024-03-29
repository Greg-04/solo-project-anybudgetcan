import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

//material ui custom theming
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

//theme options are on the configuration object
const themeConfig = {
  palette: {
    primary: {
      main: grey[300],
    },
    secondary: {
      main: '#111111',
    },
  },
};

const newTheme = createTheme(themeConfig);

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={newTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
