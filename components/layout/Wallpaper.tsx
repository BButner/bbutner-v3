import {useEffect, useState} from "react";
import clsx from "clsx";
import {stateDesktop} from "../../lib/state/state";
import { ThemeTitle } from "../../lib/theme";
import {useAtom} from "jotai";

export const Wallpaper: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [desktop, _] = useAtom(stateDesktop);

  useEffect(() => {
    setShow(desktop.currentThemeMode === ThemeTitle.Dark);
  }, [desktop.currentThemeMode]);

  return (
    <>
      <div className={clsx(
        'absolute inset-0 transition-opacity duration-200'
      )} style={{
        backgroundImage: 'url("/images/' + desktop.wallpaper.fileName + '")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}/>
      <div className={clsx(
        'absolute inset-0 transition-opacity duration-200',
        show ? 'opacity-1' : 'opacity-0'
      )} style={{
        backgroundImage: 'url("/images/' + desktop.wallpaper.fileNameDark + '")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}/>
    </>
  )
}
