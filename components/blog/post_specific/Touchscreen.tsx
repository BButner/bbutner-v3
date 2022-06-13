import {motion} from 'framer-motion';
import styles from './Touchscreen.module.sass';
import {useState} from "react";
import {ClimateControlButton} from "./Touchscreen/ClimateControlButton";
import clsx from "clsx";

const Touchscreen: React.FC = () => {
  const [currentModeId, setCurrentModeId] = useState<string>('FRONT');
  const [currentCircModeId, setCurrentCircModeId] = useState<string>('RECIRC');

  const [blackVisible, setBlackVisible] = useState<boolean>(false);

  const onClimateClicked = () => {
    setBlackVisible(true);
  }

  return (
    <div className="w-full lg:w-3/4">
      <div className="bg-black h-80 rounded-t-xl flex overflow-hidden relative">
        <div className="w-24 relative">
          <div className="w-24 absolute top-1/2 -translate-y-1/2 space-y-4">
            {[...Array(5)].map((_, i) => {
              return <motion.div
                className={styles.touchscreenButton}
                whileTap={{scale: 0.9}}
                key={i}/>
            })}
          </div>
        </div>
        <div className="p-8 w-full h-full">
          <div className="w-full h-full relative bg-zinc-800 rounded-xl overflow-hidden">
            <div className={clsx(
              'absolute inset-0 w-full h-full bg-zinc-900 transition-opacity duration-100',
              blackVisible ? 'opacity-100' : 'opacity-0'
            )}/>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center px-6 justify-between bg-black pb-6 rounded-b-xl">
        <div className="w-24 h-24 border-2 border-zic-200 rounded-full"></div>
        <div>
          <div>
            <button
              className="bg-zinc-700 mb-0.5 m-auto block rounded px-6 py-2 text-white"
              onClick={onClimateClicked}>
              CLIMATE
            </button>
            <div className="flex space-x-0.5 overflow-hidden rounded">
              <ClimateControlButton id="OUTSIDE" href="/images/blog/touchscreen/outside.png"
                                    color='green'
                                    activeId={currentCircModeId} setActiveId={setCurrentCircModeId}/>
              <ClimateControlButton id="RECIRC" href="/images/blog/touchscreen/recirculate.png"
                                    color='green'
                                    activeId={currentCircModeId} setActiveId={setCurrentCircModeId}/>
              <ClimateControlButton id="FRONT" href="/images/blog/touchscreen/front.png"
                                    activeId={currentModeId} setActiveId={setCurrentModeId}/>
              <ClimateControlButton id="DEFROST" href="/images/blog/touchscreen/defrost.png"
                                    activeId={currentModeId} setActiveId={setCurrentModeId}/>
            </div>
          </div>
        </div>
        <div className="w-24 h-24 border-2 border-zic-200 rounded-full"></div>
      </div>
    </div>
  )
}

export default Touchscreen;
