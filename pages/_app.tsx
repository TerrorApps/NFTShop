import "../styles/globals.css";
import "../styles/phonescreen.css";
import "regenerator-runtime/runtime";
import Header from "./components/header";
import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps ) {
  return(
  <>
    <Header />
    <Component {...pageProps} />
  </>
  )
}



export default MyApp;
