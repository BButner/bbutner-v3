import {Window} from "../Window";
import {useDragControls} from "framer-motion";
import {WindowButtons} from "../WindowButtons";
import Image from "next/image";

export const AboutThisSite: React.FC = () => {
  const controls = useDragControls();

  return (
    <Window dragControls={controls} className="w-fit">
      <Window.DragAreaContent dragControls={controls} className="bg-white dark:bg-dark-title rounded-t-lg pl-4">
        <WindowButtons/>
      </Window.DragAreaContent>
      <Window.Content className="pt-24 bg-zinc-100 dark:bg-dark-content rounded-lg flex items-center justify-center space-x-12 p-12">
        <div
          className="p-1.5 bg-gradient-to-b from-white to-gray-300 rounded-full flex items-center justify-center drop-shadow">
          <Image
            src="/images/avatar_small.webp"
            width={145} height={145}
            className="rounded-full"/>
        </div>
        <>
          <div>
            <p className="text-3xl"><span className="font-semibold">Beau</span> Butner</p>
            <p className="text-xs">Version 1.0</p>
            <div className="space-y-1 text-xs mt-4">
              <p className="font-semibold">Built with ❤️ using Next.js</p>
              <p><b className="mr-3">Styling</b>TailwindCSS</p>
              <p><b className="mr-3">UI/UX</b>HeadlessUI</p>
              <p><b className="mr-3">Animations</b>Framer Motion</p>
              <p><b className="mr-3">State</b>Zustand</p>
            </div>
          </div>
        </>
      </Window.Content>
    </Window>
  )
}
