import Head from 'next/head'
import '../styles/index.scss'

import Header from '../components/Header'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <div className="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  )
}
