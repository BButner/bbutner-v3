import {Window} from "../Window";
import {useDragControls} from "framer-motion";

export const Finder: React.FC = () => {
  const controls = useDragControls();
  return (
    <Window dragControls={controls}>
      <Window.DragAreaContent dragControls={controls}>
        <p>Testing</p>
        <p>More testing</p>
      </Window.DragAreaContent>
      <Window.Content>
        <div>
          <p>Another test</p>
          <p>Yet another test</p>
        </div>
      </Window.Content>
    </Window>
  )
}
