import create from "zustand";
import {IWallpaper, wallpapers} from "../wallpapers";
import {subscribeWithSelector} from "zustand/middleware";
import {RefObject} from "react";
import {Window} from "../../components/window/Window";

let stateInitialized = false;

interface OpenWindow {
  window: JSX.Element;
}

interface IStore {
  wallpaper: IWallpaper;
  darkMode: boolean;
  desktop: RefObject<Element> | null;
  openWindows: OpenWindow[];
  isDragging: boolean;
}

export const useStore = create(subscribeWithSelector<IStore>(() => ({
  wallpaper: wallpapers[0],
  darkMode: false,
  desktop: null,
  openWindows: [],
  isDragging: false,
})));

export const initState = () => {
  if (stateInitialized) return;

  useStore.subscribe(state => [state.darkMode, state.openWindows], (mode, _) => {
    console.log(mode);
    // if (mode) {
    //   document.documentElement.classList.add('dark');
    // } else {
    //   document.documentElement.classList.remove('dark');
    // }
  });

  stateInitialized = true;
}

export const loadStateFromLocal = () => {
  console.log(localStorage.getItem('bbutner.com'));
};
