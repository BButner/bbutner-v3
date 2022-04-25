import {useEffect, useState} from "react";
import clsx from "clsx";
import {useStore} from "../../lib/state/state";

export const Wallpaper: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const state = useStore();

  useEffect(() => {
    const unsub = useStore
      .subscribe((state, _) => {
        setShow(state.darkMode);
      });

    return () => {
      unsub();
    }
  }, []);

  return (
    <>
      </>
    // <div className={clsx(
    //   'absolute inset-0 transition-opacity duration-200',
    //   show ? 'opacity-1' : 'opacity-0'
    // )} style={{
    //   backgroundImage: 'url("/images/' + state.wallpaper.fileNameDark + '")',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundSize: 'cover'
    // }}/>
  )
}
