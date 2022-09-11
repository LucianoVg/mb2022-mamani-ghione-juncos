import { AuthUserProvider } from '../components/context/authUserProvider'

import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { Router } from 'next/router';
import Loading from '../components/loading';
import { useState } from 'react';
import { Container } from '@mui/material';
import { useEffect } from 'react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [cargado, setCargado] = useState(false)

  useEffect(() => {
    setCargado(true)
    Router.events.on('routeChangeStart', () => setCargado(false))
    Router.events.on('routeChangeComplete', () => setCargado(true))
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthUserProvider>
          {
            !cargado && (
              <Container maxWidth={'md'} sx={{ textAlign: 'center' }}>
                <Loading />
              </Container>
            )
          }
          {
            cargado && (
              <Component {...pageProps} />
            )
          }
        </AuthUserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};