import { AuthUserProvider } from '../components/context/authUserProvider'

import * as React from 'react';
<<<<<<< HEAD
// import '../styles/scroll.css'
=======
import { Router } from 'next/router';
import Loading from '../components/loading';
import { useState } from 'react';
import { useEffect } from 'react';
import '../styles/scroll.css'
>>>>>>> parent of 021b5a9 (quitando material del proyecto)
import '../styles/globals.css'
// import 'devextreme/dist/css/dx.light.css';

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