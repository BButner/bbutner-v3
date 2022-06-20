import {AdditionalClassNames, ChildrenProps, OnClickButton} from "../../lib/props";
import clsx from "clsx";
import {Popover} from "@headlessui/react";
import styles from "./BarButton.module.sass";
import {stateDesktop} from "../../lib/state/state";
import {WallpaperEnum} from "../../lib/wallpapers";
import {ThemeTitle} from "../../lib/theme";
import {useAtom} from "jotai";

interface PanelProps {
  position: 'left' | 'right';
}

export const Button: React.FC<ChildrenProps & AdditionalClassNames & OnClickButton> =
  ({
     children,
     className,
     onClick
   }) => {
    return (
      <Popover.Button
        className={clsx(
          'active:bg-black/10 dark:active:bg-white/10 px-2.5 rounded h-[26px] m-0 flex items-center justify-center',
          'outline-none z-50',
          className,
        )}
        onClick={onClick}>{children}</Popover.Button>
    )
  }

export const Panel: React.FC<ChildrenProps & AdditionalClassNames & PanelProps> = ({children, className, position}) => {
  const [desktop] = useAtom(stateDesktop);

  const getWallpaper = (themeMode: string): string => {
    if (desktop.wallpaper.wallpaper === WallpaperEnum.MONTEREY) {
      return themeMode === ThemeTitle.Dark ? styles.panelMontereyDark : styles.panelMonterey;
    }

    return '';
  }

  return (
    <Popover.Panel className={clsx(
      'absolute dark:text-white origin-top-right top-full mt-[8px] outline-none rounded',
      'text-xs text-gray-800 whitespace-nowrap p-2 space-y-1 w-auto w-fit shadow-lg backdropBlur',
      'shadow',
      position === 'left' ? 'left-0' : 'right-0',
      className,
      styles.panel,
      desktop.currentThemeMode === ThemeTitle.Dark ? styles.panelDark : styles.panelLight, // this is dumb
      getWallpaper(desktop.currentThemeMode)
    )}>
      {children}
    </Popover.Panel>
  )
}

const BarButtonComponent: React.FC<ChildrenProps & AdditionalClassNames> = ({children, className}) => {
  return (
    <Popover className={clsx(
      'relative',
      className
    )}>
      {children}
    </Popover>
  )
}

export const BarButton = Object.assign(BarButtonComponent, {Button, Panel})
