import { AuthUserProvider } from '../components/context/authUserProvider'
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/scroll.css'
import 'devextreme/dist/css/dx.light.css';
import { cyan, grey, indigo, red } from '@mui/material/colors';

export default function MyApp({ Component, pageProps }) {
  // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[500],
        dark: indigo[900]
      },
      secondary: {
        main: indigo[200],
        dark: indigo[400]
      },
      info: {
        main: cyan[500]
      },
      error: {
        main: red[500]
      },
      divider: grey[300]
    }
  })
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline enableColorScheme />
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </ThemeProvider>
  );
}