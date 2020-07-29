import React, { useState } from 'react';
import Header from './components/Layouts/Header';
import Footer from './components/Layouts/Footer';
import Pages from './pages';
import Main from './components';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalContext from './context/GlobalContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
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
  const [page, setPage] = useState('assessments');

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalContext>
        <CssBaseline />

        <Pages />

        {/* <Header setPage={setPage} /> */}

        {/* <Main page={page} /> */}

        {/* <Footer /> */}
      </GlobalContext>
    </MuiThemeProvider>
  );
}
