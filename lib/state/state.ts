import create from "zustand";
import {IWallpaper, wallpapers} from "../wallpapers";
import {subscribeWithSelector} from "zustand/middleware";
import {RefObject} from "react";

let stateInitialized = false;

interface IStore {
  wallpaper: IWallpaper;
  darkMode: boolean;
  desktop: RefObject<Element> | null;
}

export const useStore = create(subscribeWithSelector<IStore>(() => ({
  wallpaper: wallpapers[0],
  darkMode: false,
  desktop: null,
})));

export const initState = () => {
  if (stateInitialized) return;

  useStore.subscribe(state => state.darkMode, (mode, _) => {
    if (mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  stateInitialized = true;
}

export const loadStateFromLocal = () => {
  console.log(localStorage.getItem('bbutner.com'));
};
