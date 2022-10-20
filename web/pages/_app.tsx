import type { AppProps } from "next/app";
//import { wrapper } from "../store";

import Layout from "../components/templates/layout";

import "../styles/global.css";
import "../styles/lightTheme.css";
import "../styles/font.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
