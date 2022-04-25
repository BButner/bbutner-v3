import {BarButton} from "../BarButton";
import styles from "./ControlCenter.module.sass";
import {Switch} from "@headlessui/react";

export const ControlCenter: React.FC = () => {
  const width = '16px';
  const height = '7px';

  return (
    <BarButton>
      <BarButton.Button>
        <div>
          <Switch
            className="border border-dark-content dark:border-white relative flex items-center rounded-full"
            style={{height,width,marginBottom:'1px'}}
            checked={true}
            onChange={() => {}}>
            <span
              style={{left:'1px'}}
              className={`bg-dark-content dark:bg-white inline-block w-1 h-1 absolute transform bg-white rounded-full`}
            />
          </Switch>
          <Switch
            className="bg-dark-content border border-dark-content dark:border-white dark:bg-white w-4 relative flex items-center rounded-full"
            style={{width,height}}
            checked={true}
            onChange={() => {}}>
            <span
              style={{right:'1px'}}
              className={`dark:bg-dark-content bg-zinc-100/90 inline-block w-1 h-1 absolute transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      </BarButton.Button>
    </BarButton>
  )
}
