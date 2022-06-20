import {IWallpaper, wallpapers} from "../wallpapers";
import {RefObject} from "react";
import {ThemeTitle} from "../theme";
import {atom, SetStateAction} from "jotai";

export interface StateDesktop {
  wallpaper: IWallpaper;
  theme: string;
  currentThemeMode: string;
  desktop: RefObject<Element> | null;
}

export interface StateWindow {
  openWindowIds: string[];
  minimizedWindowIds: string[];
  activeWindowId: string;
}

export const stateDesktop = atom<StateDesktop>({
  wallpaper: wallpapers[0],
  desktop: null,
  theme: ThemeTitle.Auto,
  currentThemeMode: 'light'
});

export const stateWindow = atom<StateWindow>({
  openWindowIds: [],
  minimizedWindowIds: [],
  activeWindowId: '',
})

export abstract class StateManagerWindow {
  public static openWindow = (state: [StateWindow, ((update: SetStateAction<StateWindow>) => void)], windowId: string) => {
    const [window, setWindow] = state;

    if (window.openWindowIds.includes(windowId)) {
      setWindow({
        ...window,
        activeWindowId: windowId,
        minimizedWindowIds: window.minimizedWindowIds.filter(id => id !== windowId)
      });
    } else {
      setWindow({
        ...window,
        activeWindowId: windowId,
        openWindowIds: [...window.openWindowIds, windowId]
      });
    }
  }

  public static closeWindow = (state: [StateWindow, ((update: SetStateAction<StateWindow>) => void)], windowId: string) => {
    const [window, setWindow] = state;

    setWindow({
      ...window,
      openWindowIds: window.openWindowIds.filter(id => id !== windowId)
    });
  }

  public static minimizeWindow = (state: [StateWindow, ((update: SetStateAction<StateWindow>) => void)], windowId: string) => {
    const [window, setWindow] = state;

    if (!window.minimizedWindowIds.includes(windowId)) {
      setWindow({
        ...window,
        minimizedWindowIds: [...window.minimizedWindowIds, windowId]
      });
    }
  }
}

