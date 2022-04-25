import React from "react";
import {ChildrenProps} from "../../lib/props";
import styles from "./layout.module.sass";
import {BarIcons} from "./BarIcons";
import clsx from "clsx";
import {Wallpaper} from "./Wallpaper";
import {AppleLogo} from "./buttons/AppleLogo";

export const Layout: React.FC<ChildrenProps> = ({children}) => {
  return (
    <div className="w-screen h-screen relative">
      <Wallpaper/>
      <div className="w-screen h-screen relative flex flex-col">
        <div className={clsx(
          styles.topBar,
          'bg-white/40 dark:bg-gray-900/50 z-50'
        )}>
          <AppleLogo/>
          <BarIcons/>
        </div>
        <div className="w-full h-full flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}
