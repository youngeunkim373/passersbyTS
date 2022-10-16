import type { AppProps } from "next/app";
import { wrapper } from "../store";

import Layout from "../components/templates/layout";

import "../styles/global.css";
import "../styles/lightTheme.css";
import "../styles/font.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
