import {NextPage} from "next";
import {useEffect, useRef} from "react";
import {useStore} from "../lib/state/state";
import {Dock} from "../components/layout/Dock";

const Index: NextPage = () => {
  const desktopRef = useRef(null);
  const state = useStore();

  useEffect(() => {
    if (desktopRef) useStore.setState({desktop: desktopRef});
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <div
        ref={desktopRef}
        className="w-full flex-1 max-h-full relative overflow-hidden">
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
