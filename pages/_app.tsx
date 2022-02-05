import "../styles/globals.css";
import { useEffect } from "react";
import "regenerator-runtime/runtime";
import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps ) {
  return(
  <>
    <Component {...pageProps} />
  </>
  )
}



export default MyApp;
