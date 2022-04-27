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
  openWindowIds: string[];
  minimizedWindowIds: string[];
  activeWindowId: string;
  openWindow: (windowId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  setActiveWindow: (windowId: string) => void;
}

export const useStore = create<IStore>((set, get) => ({
  wallpaper: wallpapers[0],
  darkMode: false,
  desktop: null,
  openWindowIds: [],
  minimizedWindowIds: [],
  activeWindowId: '',
  openWindow: (windowId: string) => set(state => {
    if (state.openWindowIds.includes(windowId)) {
      return ({activeWindowId: windowId, minimizedWindowIds: state.minimizedWindowIds.filter(id => id !== windowId)});
    } else {
      return ({activeWindowId: windowId, openWindowIds: [...state.openWindowIds, windowId]});
    }
  }),
  closeWindow: (windowId: string) => set({openWindowIds: get().openWindowIds.filter(id => id !== windowId)}),
  minimizeWindow: (windowId: string) => set(state => {
    if (state.minimizedWindowIds.includes(windowId)) {
      return ({});
    } else {
      return ({minimizedWindowIds: [...state.minimizedWindowIds, windowId]});
    }
  }),
  setActiveWindow: (windowId: string) => set({activeWindowId: windowId}),
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
