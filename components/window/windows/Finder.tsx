import {Window, WindowProps} from "../Window";
import {useDragControls} from "framer-motion";
import {WindowButtons} from "../WindowButtons";
import Image from "next/image";

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
  {title: 'Downloads', iconSrc: 'downloads.png'}
]

export const Finder: React.FC<WindowProps> = ({windowId}) => {
  const controls = useDragControls();
  return (
    <Window windowId={windowId} dragControls={controls} className="bg-transparent">
      <Window.DragAreaContent dragControls={controls}>
        <div className="h-14 flex items-center w-[900px] justify-between">
          <WindowButtons windowId={windowId} className="pl-4 w-[204px]"/>
          <div className="w-full h-full rounded-tr-lg border-b border-white hover:border-zinc-200 dark:border-dark-content dark:hover:border-black">
          </div>
        </div>
      </Window.DragAreaContent>
      <Window.Content className="min-w-[900px]">
        <div className="flex">
          <div
            className="w-[200px] h-full py-2 px-4 bg-zinc-200/70 dark:bg-dark-title/70 backdropBlur pt-12 rounded-l-lg space-y-3 pb-52">
            <p className="text-[10px] opacity-50">Favorites</p>
            {favorites.map(fav => {
              return <div key={fav.iconSrc} className="flex items-center text-xs space-x-2">
                <Image src={`/images/finder_icons/${fav.iconSrc}`} width={14} height={14}/>
                <p className="m-0 p-0">{fav.title}</p>
              </div>
            })}
          </div>
          <div className="w-full bg-white dark:bg-dark-content rounded-r-lg border-l border-white dark:border-black">
          </div>
        </div>
      </Window.Content>
    </Window>
  )
}
