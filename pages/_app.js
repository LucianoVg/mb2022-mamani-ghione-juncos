import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/style5.css'

import { AuthUserProvider } from '../components/context/authUserProvider'


export default function MyApp({ Component, pageProps }) {
  return <AuthUserProvider>
    <Component {...pageProps} />
  </AuthUserProvider>
}
