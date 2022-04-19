import {NextPage} from "next";
import {Window} from "../components/window/Window";
import {useEffect, useRef} from "react";
import {useStore} from "../lib/state/state";
import {motion} from "framer-motion";
import {Finder} from "../components/window/windows/Finder";

const Index: NextPage = () => {
  const desktopRef = useRef(null);
  const windows = [<Window key={1}>
    <div className="bg-purple-500">
      <p className="p-8">This is a test with me typing in here</p>
    </div>
  </Window>];

  useEffect(() => {
    if (desktopRef) useStore.setState({desktop: desktopRef});
  }, [desktopRef])

  return (
    <div
      ref={desktopRef}
      className="w-full h-full flex items-center justify-center">
      <Finder/>
    </div>
  )
}

export default Index
