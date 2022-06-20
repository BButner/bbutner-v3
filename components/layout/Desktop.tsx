import {useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {desktopIcons} from "../../lib/desktop";
import {AboutThisSite} from "../window/windows/AboutThisSite";
import {Finder} from "../window/windows/Finder";
import {WindowId} from "../../lib/windows";
import {Dock} from "./Dock";
import styles from "./Desktop.module.sass"
import clsx from "clsx";
import {stateDesktop, stateWindow} from "../../lib/state/state";
import { useAtom } from "jotai";

export const Desktop: React.FC = () => {
  const desktopRef = useRef(null);
  const [desktop, setDesktop] = useAtom(stateDesktop);
  const [windowState] = useAtom(stateWindow);

  const shouldBeOpen = (windowId: string): boolean =>
    windowState.openWindowIds.includes(windowId);

  useEffect(() => {
    if (desktopRef && !desktop.desktop) {
      setDesktop({
        ...desktop,
        desktop: desktopRef
      })
    }
  }, [windowState.activeWindowId, windowState.openWindowIds])

  const openUrl = (href: string) => {
    window.open(href, '_blank');
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div
        ref={desktopRef}
        className="w-full flex-1 relative overflow-hidden"
        style={{
          maxHeight: 'calc(100% - 53px)'
        }}>
        <div
          className="flex flex-1 justify-start"
          style={{
            flexFlow: 'column wrap-reverse',
            alignContent: 'flex-start'
          }}>
          {desktopIcons.map(icon => {
            return <motion.button
              onDoubleClick={() => openUrl(icon.href)}
              key={icon.title}
              className={styles.desktopIcon}
              drag
              dragElastic={0}
              dragMomentum={false}
              dragConstraints={desktopRef}>
              <div
                className={styles.desktopIconWrapper}
                style={{
                  alignSelf: 'flex-start',
                }}>
                <div
                  className={styles.desktopIconImage}
                  style={{
                    backgroundImage: `url(${icon.iconUrl})`,
                    backgroundSize: 'cover'
                  }}
                />
              </div>
              <p
                className={clsx(
                  'font-semibold text-xs text-center whitespace-pre-wrap text-white',
                  styles.desktopIconTitle
                )}>{icon.title}</p>
            </motion.button>
          })}
        </div>
        {shouldBeOpen(WindowId.AboutThisSite) &&
          <AboutThisSite windowId={WindowId.AboutThisSite}/>}
        {shouldBeOpen(WindowId.Finder) &&
          <Finder windowId={WindowId.Finder}/>}
      </div>
      <div className="w-screen h-12 flex justify-center mb-1 fixed bottom-0 left-1/2 -translate-x-1/2">
        <Dock/>
      </div>
    </div>
  )
}
