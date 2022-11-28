import { AuthUserProvider } from '../components/context/authUserProvider'

import * as React from 'react';
import '../styles/scroll.css'
import 'devextreme/dist/css/dx.light.css';
import '../styles/fontSize.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}