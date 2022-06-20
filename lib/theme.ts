import {StateDesktop} from "./state/state";
import {SetStateAction} from "jotai";

export class ThemeTitle {
  static Dark: string = 'dark';
  static Light: string = 'light';
  static Auto: string = 'auto';
}

export const updateCurrentTheme = (state: [StateDesktop, ((update: SetStateAction<StateDesktop>) => void)]): void => {
  const [desktop, setDesktop] = state;
  const theme: string = desktop.theme;

  console.log('updateCurrentTheme', state, theme);

  if (theme === ThemeTitle.Auto) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      setDesktop({
        ...desktop,
        currentThemeMode: ThemeTitle.Dark
      });
    } else {
      document.documentElement.classList.remove('dark');
      setDesktop({
        ...desktop,
        currentThemeMode: ThemeTitle.Light
      });
    }
  } else {
    if (theme === ThemeTitle.Light) {
      document.documentElement.classList.remove('dark');
      setDesktop({
        ...desktop,
        currentThemeMode: ThemeTitle.Light
      });
    } else {
      document.documentElement.classList.add('dark');
      setDesktop({
        ...desktop,
        currentThemeMode: ThemeTitle.Dark
      });
    }
  }
}
