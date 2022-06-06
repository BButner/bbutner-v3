import {useStore} from "./state/state";

export class ThemeTitle {
  static Dark: string = 'dark';
  static Light: string = 'light';
  static Auto: string = 'auto';
}

export const updateCurrentTheme = (): void => {
  const theme: string = useStore.getState().theme;

  if (theme === ThemeTitle.Auto) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      useStore.setState({currentThemeMode: ThemeTitle.Dark});
    } else {
      document.documentElement.classList.remove('dark');
      useStore.setState({currentThemeMode: ThemeTitle.Light});
    }
  } else {
    if (theme === ThemeTitle.Light) {
      document.documentElement.classList.remove('dark');
      useStore.setState({currentThemeMode: ThemeTitle.Light});
    } else {
      document.documentElement.classList.add('dark');
      useStore.setState({currentThemeMode: ThemeTitle.Dark});
    }
  }
}
