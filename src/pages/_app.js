import 'normalize.css';
import 'index.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Head>
        <title>Schedule Control</title>
        
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <Component {...pageProps} />

    </>
  )
  
}

export default MyApp
