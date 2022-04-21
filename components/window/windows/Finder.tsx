import {Window, WindowProps} from "../Window";
import {useDragControls} from "framer-motion";
import {WindowButtons} from "../WindowButtons";

export const Finder: React.FC<WindowProps> = ({windowId}) => {
  const controls = useDragControls();
  return (
    <Window dragControls={controls} className="bg-transparent">
      <Window.DragAreaContent dragControls={controls}>
        <div className="h-12 flex items-center px-4 w-[182px]">
          <WindowButtons windowId={windowId}/>
        </div>
      </Window.DragAreaContent>
      <Window.Content className="min-w-[300px]">
        <div className="flex">
          <div className="w-[182px] h-full p-2 bg-zinc-200/60 backdropBlur pt-12 rounded-l-lg">
            <p>Testing</p>
            <p>Testing</p>
            <p>Testing</p>
            <p>Testing</p>
            <p>Testing</p>
            <p>Testing</p>
          </div>
          <div className="w-full bg-white dark:bg-dark-content rounded-r-lg">

          </div>
        </div>
      </Window.Content>
    </Window>
  )
}
