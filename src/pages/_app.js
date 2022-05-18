import 'normalize.css';
import 'index.css'
import Head from 'next/head';
import { AreaProvider } from 'common/context/AreaContext';
import { ClientsProvider } from 'common/context/ClientsContext';

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Head>
        <title>Schedule Control</title>
        
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AreaProvider>
        <ClientsProvider>
          <Component {...pageProps} />
        </ClientsProvider>
      </AreaProvider>

    </>
  )
  
}

export default MyApp
