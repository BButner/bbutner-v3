import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import {Layout} from "../components/layout/layout";
import React, {useEffect} from "react";
import {initState, loadStateFromLocal, useStore} from "../lib/state/state";

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    loadStateFromLocal();
    initState();

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      // document.documentElement.classList.add('dark');
    } else {
      // document.documentElement.classList.remove('dark');
    }

    var mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.onchange = (e) => {
      if (e.matches) {
        useStore.setState({ darkMode: true });
      } else {
        useStore.setState({ darkMode: false });
      }
    }
  }, []);

  return <Layout>
      <Component {...pageProps} />
    </Layout>
}

export default MyApp
