import {useStore} from "../../lib/state/state";
import Image from "next/image";
import {OnClickButton} from "../../lib/props";
import {Finder} from "../window/windows/Finder";
import styles from "./Dock.module.sass";

export const Dock: React.FC = () => {
  const store = useStore();

  const openFinder = () => {
    store.openWindow({
      window: <Finder windowId="finder"/>,
      iconHref: '/images/dock_icons/finder.png',
      isMinimized: false,
      windowId: 'finder',
    })
  }

  return (
    <div
      className="flex items-center p-2 bg-white/40 dark:bg-gray-900/80 backdropBlur rounded-xl dark:border dark:border-dark-title space-x-3">
      <DockIcon imageSrc={"/images/dock_icons/finder.png"} key="finder" onClick={openFinder}/>
      <div className={styles.divider}/>
      {useStore.getState().openWindows.filter(window => window.windowId !== 'finder').map((window, index) => <DockIcon imageSrc={window.iconHref} key={index}/>)}
    </div>
  )
}

interface DockIconProps {
  imageSrc: string;
  key: string | number;
}

const DockIcon: React.FC<DockIconProps & OnClickButton> = ({imageSrc, key, onClick}) => {
  return <button onClick={onClick} className="m-0 p-0 w-8 h-8 bg-zinc-800 rounded-md">
    <Image key={key} src={imageSrc} height={32} width={32} className="rounded-md"/>
  </button>
}
