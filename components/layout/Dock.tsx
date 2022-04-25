import {useStore} from "../../lib/state/state";
import Image from "next/image";
import {AdditionalClassNames, OnClickButton} from "../../lib/props";
import {Finder} from "../window/windows/Finder";
import styles from "./Dock.module.sass";
import clsx from "clsx";
import {AboutThisSite} from "../window/windows/AboutThisSite";
import React from "react";

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
      className="flex items-center p-2 bg-white/40 dark:bg-gray-900/80 backdropBlur rounded-xl dark:border dark:border-dark-title space-x-3">
      <DockIcon imageSrc="/images/dock_icons/finder.png" key="finder" onClick={openFinder}/>
      <div className={styles.divider}/>
      <DockIcon imageSrc="/images/dock_icons/about.png" key="about" onClick={openAbout}/>
      {useStore.getState().openWindows.filter(window => window.windowId !== 'Finder' && window.windowId !== 'AboutThisSite').map((window, index) => <DockIcon imageSrc={window.iconHref} key={index}/>)}
      <div className={styles.divider}/>
      <DockIcon imageSrc={"/images/dock_icons/trash.png"} key={"trash"} transparent/>
    </div>
  )
}

interface DockIconProps {
  imageSrc: string;
  key: string | number;
  transparent?: boolean;
}

const DockIcon: React.FC<DockIconProps & OnClickButton> = ({imageSrc, key, onClick, transparent}) => {
  return <button onClick={onClick} className={clsx(styles.dockButton, !transparent ? 'bg-zinc-700' : '')}>
    <Image key={key} src={imageSrc} width={32} height={32}/>
  </button>
}
