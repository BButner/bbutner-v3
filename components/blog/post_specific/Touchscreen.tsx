import {motion} from 'framer-motion';
import styles from './Touchscreen.module.sass';

const Touchscreen: React.FC = () => {
  return (
    <div className="w-full lg:w-3/4">
      <div className="bg-black h-80 rounded-t-xl flex overflow-hidden relative">
        <div className="w-24 relative">
          <div className="w-24 absolute top-1/2 -translate-y-1/2 space-y-4">
            {[...Array(5)].map((_, i) => {
              return <motion.div
                className={styles.touchscreenButton}
                whileTap={{ scale: 0.9 }}
                key={i}/>
            })}
          </div>
        </div>
        <div className="p-8 w-full h-full w-32">
          <div className="w-full h-full bg-zinc-800 rounded-xl overflow-hidden"></div>
        </div>
      </div>
      <div className="w-full flex items-center px-6 justify-between bg-black pb-6 rounded-b-xl">
        <div className="w-24 h-24 border-2 border-zic-200 rounded-full"></div>
        <div>
          <button className="bg-zinc-700 rounded px-6 py-2 text-white">CLIMATE</button>
        </div>
        <div className="w-24 h-24 border-2 border-zic-200 rounded-full"></div>
      </div>
    </div>
  )
}

export default Touchscreen;
