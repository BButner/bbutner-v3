import {useStore} from "../../lib/state/state";
import Image from "next/image";
import {AdditionalClassNames, OnClickButton} from "../../lib/props";
import {Finder} from "../window/windows/Finder";
import styles from "./Dock.module.sass";
import clsx from "clsx";
import {AboutThisSite} from "../window/windows/AboutThisSite";
import React from "react";
import {WindowProps} from "../window/Window";

export const Dock: React.FC = () => {
  const store = useStore();

  const openFinder = () => {
    store.openWindow({
      window: <Finder windowId="Finder"/>,
      iconHref: '/images/dock_icons/finder.png',
      isMinimized: false,
      windowId: 'Finder',
    })
  }

  const openAbout = () => {
    const windowId = 'AboutThisSite';

    store.openWindow({
      window: <AboutThisSite windowId={windowId}/>,
      iconHref: "/images/dock_icons/about.png",
      isMinimized: false,
      windowId
    });
  }

  return (
    <div
      className="flex items-center px-2 pt-2 pb-0.5 bg-white/40 dark:bg-gray-900/80 backdropBlur rounded-xl dark:border dark:border-dark-title space-x-3">
      <DockIcon windowId="Finder" imageSrc="/images/dock_icons/finder.png" key="finder" onClick={openFinder}/>
      <div className={styles.divider}/>
      <DockIcon windowId="AboutThisSite" imageSrc="/images/dock_icons/about.png" key="about" onClick={openAbout}/>
      {useStore.getState().openWindows.filter(window => window.windowId !== 'Finder' && window.windowId !== 'AboutThisSite').map((window, index) => <DockIcon windowId={window.windowId} imageSrc={window.iconHref} key={index}/>)}
      <div className={styles.divider}/>
      <DockIcon windowId="trash" imageSrc={"/images/dock_icons/trash.png"} key={"trash"} transparent/>
    </div>
  )
}

interface DockIconProps {
  imageSrc: string;
  key: string | number;
  transparent?: boolean;
}

const DockIcon: React.FC<DockIconProps & OnClickButton & WindowProps> = ({imageSrc, key, onClick, transparent, windowId}) => {
  const store = useStore();

  return <div className="m-auto">
    <button onClick={onClick} className={clsx(styles.dockButton, !transparent ? 'bg-zinc-700' : '')}>
      <Image key={key} src={imageSrc} width={32} height={32}/>
    </button>
    <div
      className={clsx(
        store.openWindows.filter(window => window.windowId === windowId).length > 0 ? 'opacity-1' : 'opacity-0',
        'bg-dark-content w-1 h-1 rounded-full m-auto mt-0.5'
      )}/>
  </div>
}
