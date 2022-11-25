import "../styles/globals.css";
import "../styles/sb-admin-2.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
