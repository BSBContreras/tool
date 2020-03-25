import React, { useState } from 'react';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Main from './components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo
  }
});

export default function App() {
  const [page, setPage] = useState('assessments');

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Header setPage={setPage} />

      <Main page={page} />

      <Footer />
    </MuiThemeProvider>
  );
}
