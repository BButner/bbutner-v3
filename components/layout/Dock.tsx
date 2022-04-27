import {useStore} from "../../lib/state/state";
import Image from "next/image";
import {OnClickButton} from "../../lib/props";
import styles from "./Dock.module.sass";
import clsx from "clsx";
import React from "react";
import {WindowProps} from "../window/Window";
import {WindowId} from "../../lib/windows";

export const Dock: React.FC = () => {
  const store = useStore();

  const openFinder = () => {
    store.openWindow(WindowId.Finder);
  }

  const openAbout = () => {
    store.openWindow(WindowId.AboutThisSite);
  }

  return (
    <div
      className="flex items-center px-2 pt-2 pb-0.5 bg-white/40 dark:bg-dark-content/50 backdropBlur rounded-xl dark:border dark:border-dark-title space-x-3">
      <DockIcon windowId={WindowId.Finder} key={WindowId.Finder}
                onClick={openFinder}/>
      <div className={styles.divider}/>
      <DockIcon windowId={WindowId.AboutThisSite} key={WindowId.AboutThisSite}
                onClick={openAbout}/>
      <div className={styles.divider}/>
      <DockIcon windowId="Trash" key={"Trash"} transparent/>
    </div>
  )
}

interface DockIconProps {
  key: string | number;
  transparent?: boolean;
}

const DockIcon: React.FC<DockIconProps & OnClickButton & WindowProps> = ({key, onClick, transparent, windowId}) => {
  const store = useStore();

  return <div className="m-auto">
    <button onClick={onClick} className={clsx(styles.dockButton, !transparent ? 'bg-zinc-700' : '')}>
      <Image key={key} src={`/images/dock_icons/${windowId}.png`} width={32} height={32}/>
    </button>
    <div
      className={clsx(
        store.openWindowIds.includes(windowId) ? 'opacity-1' : 'opacity-0',
        'bg-dark-content dark:bg-zinc-400/80 w-1 h-1 rounded-full m-auto mt-0.5 transition-all duration-200'
      )}/>
  </div>
}
