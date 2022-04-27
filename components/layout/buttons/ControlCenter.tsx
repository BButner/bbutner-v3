import {BarButton} from "../BarButton";
import {useStore} from "../../../lib/state/state";
import {Theme} from "./ControlCenter/Theme";
import {ThemeTitle} from "../../../lib/theme";

export const ControlCenter: React.FC = () => {
  const store = useStore();

  return (
    <BarButton>
      <BarButton.Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 29 29"
          width={16}>
          <path
            fill={store.currentThemeMode === ThemeTitle.Dark ? 'white' : 'fill-dark-content'}
            d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z"/>
        </svg>
      </BarButton.Button>
      <BarButton.Panel position="right" className="overflow-hidden rounded-xl">
        <div className="p-2 bg-zinc-100/40 dark:bg-dark-content/50 dark:border dark:border-dark-title shadow-lg rounded-xl">
          <p className="pb-1 font-semibold text-xs">Dark Mode</p>
          <Theme/>
        </div>
      </BarButton.Panel>
    </BarButton>
  )
}
