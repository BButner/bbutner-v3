import {NextPage} from "next";
import {useEffect, useRef} from "react";
import {useStore} from "../lib/state/state";
import {Finder} from "../components/window/windows/Finder";
import {AboutThisSite} from "../components/window/windows/AboutThisSite";
import {Dock} from "../components/layout/Dock";

const Index: NextPage = () => {
  const desktopRef = useRef(null);
  const state = useStore();

  useEffect(() => {
    if (desktopRef) useStore.setState({desktop: desktopRef});

    // setTimeout(() => {
    //   useStore.setState({openWindows: [...useStore.getState().openWindows, {window: <AboutThisSite/>}]})
    //   console.log('pls')
    // }, 3000)
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <div
        ref={desktopRef}
        className="w-full flex-1 max-h-full relative overflow-hidden">
        {/*<Finder/>*/}
        {/*<AboutThisSite/>*/}
        {state.openWindows.map(window => {
          return window.window
        })}
      </div>
      <div className="w-screen h-12 flex justify-center">
        <Dock/>
      </div>
    </div>
  )
}

export default Index
