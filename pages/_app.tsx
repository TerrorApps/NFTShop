import "../styles/globals.css";
import { useEffect } from "react";
import "regenerator-runtime/runtime";

function MyApp({ Component, pageProps }) {
  return(
  <>
    <Component {...pageProps} />;
    <style jsx global>{`
  body {
    background: #000;
  }
`}</style>
  </>
  )
}



export default MyApp;
