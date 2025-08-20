import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbar = ["/login", "/register"].includes(router.pathname);

  return (
    <>
      <Head>
        <title>Real Estate App</title>
        <meta name="description" content="Find and book your dream property" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!hideNavbar && <Navbar />}

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
