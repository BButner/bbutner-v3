import {Window, WindowProps} from "../Window";
import {useDragControls} from "framer-motion";
import {WindowButtons} from "../WindowButtons";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {finderProjects} from "../../../lib/finder/finder";

interface Favorite {
  title: string;
  iconSrc: string;
}

const favorites: Favorite[] = [
  {title: 'AirDrop', iconSrc: 'airdrop.png'},
  {title: 'Recents', iconSrc: 'recents.png'},
  {title: 'Applications', iconSrc: 'apps.png'},
  {title: 'Desktop', iconSrc: 'desktop.png'},
  {title: 'Documents', iconSrc: 'documents.png'},
  {title: 'Downloads', iconSrc: 'downloads.png'},
  {title: 'bbutner', iconSrc: 'bbutner.png'}
]

export const Finder: React.FC<WindowProps> = ({windowId}) => {
  const controls = useDragControls();
  const [rowCount, setRowCount] = useState<number>(0);
  const documentContainerRef = useRef<HTMLDivElement>(null);

  const ROW_HEIGHT = 20;

  useEffect(() => {
    if (documentContainerRef.current) {
      setRowCount(Math.floor(documentContainerRef.current.clientHeight / ROW_HEIGHT) + 1);
    }
  }, []);

  return (
    <Window windowId={windowId} dragControls={controls} className="bg-transparent">
      <Window.DragAreaContent dragControls={controls}>
        <div className="h-14 flex items-center w-[900px] justify-between">
          <WindowButtons windowId={windowId} className="pl-4 w-[204px]"/>
          <div
            className="w-full h-full rounded-tr-lg">
          </div>
        </div>
      </Window.DragAreaContent>
      <Window.Content className="min-w-[900px]">
        <div className="flex">
          <div
            className="w-[200px] h-full py-2 px-4 bg-zinc-200/70 dark:bg-dark-title/70 backdropBlur pt-12 rounded-l-lg space-y-2 pb-52">
            <p className="text-[10px] opacity-50">Favorites</p>
            {favorites.map(fav => {
              return <div
                key={fav.iconSrc}
                className={clsx(
                  'flex items-center text-xs space-x-2 px-2 py-1 rounded-md',
                  fav.title === 'bbutner' ? 'bg-zinc-300/60 dark:bg-zinc-700' : ''
                )}>
                < Image src={`/images/finder_icons/${fav.iconSrc}`} width={14} height={14}/>
                <p className="m-0 p-0">{fav.title}</p>
              </div>
            })
            }
          </div>
          <div
            className="w-full flex flex-wrap flex-col bg-white dark:bg-dark-content rounded-r-lg border-l border-white dark:border-black">
            <div className="h-14 w-full flex items-center">
              <p className="dark:text-white pl-6">/Users/bbutner</p>
            </div>
            <div
              ref={documentContainerRef}
              className="w-full flex-1 relative">
              <div className="w-full h-6">
                <div
                  className="h-6 flex pl-6 text-xs items-center border-t border-b border-zinc-200 dark:border-dark-title">
                  <p className="w-32 pl-4 font-semibold">Name</p>
                  <p className="text-zinc-500 dark:text-zinc-400">Type</p>
                </div>
              </div>
              <div
                style={{
                  height: 'calc(100% - 24px)'
                }}
                className="absolute w-full overflow-hidden">
                {rowCount > 0 && [...Array(rowCount)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        'h-6 w-full',
                        index % 2 === 0 ? 'bg-white dark:bg-dark-content' : 'bg-zinc-100 dark:bg-dark-title'
                      )}/>
                  )
                })}
              </div>
              <div className="relative">
                {finderProjects.map(project =>
                  <button
                    onDoubleClick={() => open(project.href)}
                    className="h-6 text-xs w-full block text-left focus:bg-blue-500 focus:text-white"
                    key={project.title}>
                    <div className="flex items-center pl-6">
                      <p className="w-32">{project.title}</p>
                      <p className="text-zinc-500 dark:text-zinc-400">{project.type}</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Window.Content>
    </Window>
  )
}
