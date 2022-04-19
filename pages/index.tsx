import {NextPage} from "next";
import {useEffect, useRef} from "react";
import {useStore} from "../lib/state/state";
import {Finder} from "../components/window/windows/Finder";

const Index: NextPage = () => {
  const desktopRef = useRef(null);

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
