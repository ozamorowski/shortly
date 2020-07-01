import Head from 'next/head'
import '../styles/index.scss'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
