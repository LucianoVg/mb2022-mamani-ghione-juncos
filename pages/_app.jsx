import { AuthUserProvider } from '../components/context/authUserProvider'

import * as React from 'react';
import { Router } from 'next/router';
import Loading from '../components/loading';
import { useState } from 'react';
import { useEffect } from 'react';
import '../styles/scroll.css'
import 'devextreme/dist/css/dx.light.css';

export default function MyApp({ Component, pageProps }) {
  const [cargado, setCargado] = useState(false)

  useEffect(() => {
    setCargado(true)
    Router.events.on('routeChangeStart', () => setCargado(false))
    Router.events.on('routeChangeComplete', () => setCargado(true))
  }, [])

  return (
    <AuthUserProvider>
      {
        !cargado && (
          <div className="container">
            <Loading />
          </div>
        )
      }
      {
        cargado && (
          <Component {...pageProps} />
        )
      }
    </AuthUserProvider>
  );
}