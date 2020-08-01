import React from 'react';
import Pages from './pages';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalContext from './context/GlobalContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#22ACF0',
      contrastText: '#FFFFFF'
    },
    secondary: indigo,
    link: {
      blue: '#88F'
    },
    save: {
      main: '#99EE99',
      contrastText: '#333333'
    },
    duplicate: {
      main: '#EDED66',
      contrastText: '#333333'
    },
    remove: {
      main: '#EE6666',
      contrastText: '#333333'
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
    ]
  }
});

export default function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalContext>
        <CssBaseline />

        <Pages />

      </GlobalContext>
    </MuiThemeProvider>
  );
}
