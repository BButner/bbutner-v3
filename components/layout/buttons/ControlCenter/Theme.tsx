import {AnimateSharedLayout, motion} from "framer-motion";
import {useStore} from "../../../../lib/state/state";
import {ThemeTitle} from "../../../../lib/theme";
import clsx from "clsx";

interface ThemeState {
  title: string;
  backendName: string;
}

const themes: ThemeState[] =
  [
    {
      title: 'Dark',
      backendName: ThemeTitle.Dark
    },
    {
      title: 'Light',
      backendName: ThemeTitle.Light
    },
    {
      title: 'Auto',
      backendName: ThemeTitle.Auto
    }
  ]

export const Theme: React.FC = () => {
  const store = useStore();

  return (
    <div>
        <ul className="flex justify-center list-none h-6 items-center bg-zinc-300/60 dark:bg-dark-title rounded">
          {themes.map(theme =>
            <li
              className="h-full relative z-10 px-2 flex items-center justify-center"
              key={theme.title}>
              <button
                className={clsx(
                  'h-full transition-colors duration-200',
                  store.theme === theme.backendName ? 'text-white' : ''
                )}
                onClick={() => {
                  useStore.setState({theme: theme.backendName})
                }}>
                {theme.title}
              </button>
              {store.theme === theme.backendName &&
                <motion.div
                  layoutId="highlight"
                  className="absolute top-0 h-full w-full bg-blue-500 rounded -z-10"
                  initial={false}>
                </motion.div>}
            </li>)}
        </ul>
    </div>
  )
}