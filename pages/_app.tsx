import "../styles/globals.css";
import "../styles/sb-admin-2.min.css";
import type { AppProps } from "next/app";

interface roomdata {
  id: number;
  Room: string;
  ctime: number;
  co2: number;
  htime: number;
  humidity: number;
  ltime: number;
  ptime: number;
  pir: number;
  ttime: number;
  temperature: number;
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
