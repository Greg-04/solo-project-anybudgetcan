import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

//material ui custom theming
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, teal } from '@mui/material/colors';

//theme options are on the configuration object
const themeConfig = {
  palette: {
    primary: {
      main: blueGrey[700], // Dark blue-grey for primary elements
    },
    secondary: {
      main: teal[500], // Teal color for secondary elements
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
