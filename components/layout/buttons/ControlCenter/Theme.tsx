import {motion} from "framer-motion";
import {stateDesktop} from "../../../../lib/state/state";
import {ThemeTitle, updateCurrentTheme} from "../../../../lib/theme";
import clsx from "clsx";
import {useAtom} from "jotai";
import {useEffect} from "react";

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
  const desktopState = useAtom(stateDesktop);
  const [desktop, setDesktop] = desktopState;

  useEffect(() => {
    updateCurrentTheme(desktopState);
  }, [desktop.theme]);

  return (
    <div>
      <ul className="flex justify-center list-none h-6 items-center bg-zinc-300/60 dark:bg-dark-content rounded">
        {themes.map(theme =>
          <li
            className="h-full relative z-10 px-2 flex items-center justify-center"
            key={theme.title}>
            <button
              className={clsx(
                'h-full transition-colors duration-200',
                desktop.theme === theme.backendName ? 'text-white' : ''
              )}
              onClick={() => {
                setDesktop({
                  ...desktop,
                  theme: theme.backendName
                });
              }}>
              {theme.title}
            </button>
            {desktop.theme === theme.backendName &&
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
