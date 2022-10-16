import "../styles/global.css";
import "../styles/lightTheme.css";
import "../styles/font.css";
import type { AppProps } from "next/app";
import Layout from "../components/templates/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
