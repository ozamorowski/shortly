import Head from 'next/head'
import '../styles/index.scss'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shortly - URL shortening app</title>
        <meta property="og:title" content="Shortly - URL shortening app" />
      </Head>
      <main>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  )
}
