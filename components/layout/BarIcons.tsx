import {Clock} from "./buttons/Clock";
import {Siri} from "./buttons/Siri";
import {ControlCenter} from "./buttons/ControlCenter";

export const BarIcons: React.FC = () => {
  return (
    <div className="flex pr-2">
      <ControlCenter/>
      <Siri/>
      <Clock/>
    </div>
  )
}
