import create from "zustand";
import {IWallpaper, wallpapers} from "../wallpapers";
import {RefObject} from "react";

let stateInitialized = false;

interface OpenWindow {
  window: JSX.Element;
  iconHref: string;
  isMinimized: boolean;
  windowId: string;
}

interface IStore {
  wallpaper: IWallpaper;
  darkMode: boolean;
  desktop: RefObject<Element> | null;
  openWindows: OpenWindow[];
  openWindow: (window: OpenWindow) => void;
  closeWindow: (windowId: string) => void;
}

export const useStore = create<IStore>(set => ({
  wallpaper: wallpapers[0],
  darkMode: false,
  desktop: null,
  openWindows: [],
  openWindow: (newWindow: OpenWindow) => set(state => {
    const newWindowArray: OpenWindow[] = [];
    if (state.openWindows.filter(window => window.windowId === newWindow.windowId).length === 0) {
      newWindowArray.push(newWindow);
    }
    return ({openWindows: [...state.openWindows, ...newWindowArray]})
  }),
  closeWindow: (windowId: string) => set(state => ({openWindows: state.openWindows.filter(window => window.windowId !== windowId)}))
}));

export const initState = () => {
  if (stateInitialized) return;

  useStore.subscribe((state, _) => {
    if (state.darkMode) {
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
