import {DragControls, motion, useDragControls} from "framer-motion";
import {AdditionalClassNames, ChildrenProps} from "../../lib/props";
import styles from "./Window.module.sass";
import {useStore} from "../../lib/state/state";
import clsx from "clsx";

interface DragControlProps {
  dragControls: DragControls;
}

export const DragAreaContent: React.FC<ChildrenProps & DragControlProps & AdditionalClassNames> = ({children, dragControls, className}) => {
  return (
    <div
      className={clsx(
        'h-12 inset-0 flex items-center px-4',
        className,
      )}
      onPointerDown={(e) => dragControls.start(e)}>
      <div className="flex space-x-2">
        <button className={styles.buttonClose}/>
        <button className={styles.buttonMinimize}/>
        <button className={styles.buttonMaximize}/>
      </div>
      {children}
    </div>
  )
}

export const Content: React.FC<ChildrenProps> = ({children}) => {
  return <>{children}</>
}

const WindowComponent: React.FC<ChildrenProps & AdditionalClassNames & DragControlProps> =
  ({
     children,
     className,
     dragControls,
   }) => {
    const store = useStore();

    if (!store.desktop) return <></>

    return (
      <motion.div
        drag
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={store.desktop}
        dragListener={false}
        dragControls={dragControls}
        className={clsx(
          'rounded-lg bg-white dark:bg-zinc-800 relative overflow-hidden',
          className
        )}>
        {children}
      </motion.div>
    )
  }

export const Window = Object.assign(WindowComponent, { DragAreaContent, Content })
