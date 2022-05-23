import {Clock} from "./buttons/Clock";
import {Siri} from "./buttons/Siri";
import {ControlCenter} from "./buttons/ControlCenter";
import {CurrentlyPlaying} from "./buttons/CurrentlyPlaying";

export const BarIcons: React.FC = () => {
  return (
    <div className="flex pr-2">
      <CurrentlyPlaying/>
      <ControlCenter/>
      <Siri/>
      <Clock/>
    </div>
  )
}
