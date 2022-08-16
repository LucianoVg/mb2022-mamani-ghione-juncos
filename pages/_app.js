import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/style5.css'
import '../public/js/scripts'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
