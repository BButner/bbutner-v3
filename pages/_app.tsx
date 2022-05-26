import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import React, {useEffect} from "react";
import {initState, useStore} from "../lib/state/state";
import {ThemeTitle, updateCurrentTheme} from "../lib/theme";

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    initState();
    const localTheme = localStorage.getItem('theme');

    // If theme is stored locally, use that, otherwise default is auto
    if (localTheme) {
      switch (localTheme) {
        case ThemeTitle.Dark:
          useStore.setState({theme: ThemeTitle.Dark});
          break;
        case ThemeTitle.Light:
          useStore.setState({theme: ThemeTitle.Light})
          break;
        default:
          useStore.setState({theme: ThemeTitle.Auto})
          break;
      }
    }

    updateCurrentTheme();

//    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
//    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//      // document.documentElement.classList.add('dark');
//      updateDarkModeState(true);
//    } else {
//      // document.documentElement.classList.remove('dark');
//      updateDarkModeState(false);
//    }
//
    var mql = window.matchMedia('(prefers-color-scheme: dark)')

    mql.onchange = (_) => {
      updateCurrentTheme();
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
