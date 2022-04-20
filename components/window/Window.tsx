import {DragControls, motion, useDragControls} from "framer-motion";
import {AdditionalClassNames, ChildrenProps} from "../../lib/props";
import styles from "./Window.module.sass";
import {useStore} from "../../lib/state/state";
import clsx from "clsx";
import {WindowButtons} from "./WindowButtons";
import {RefObject, useEffect, useRef, useState} from "react";

interface DragControlProps {
  dragControls: DragControls;
}

export const DragAreaContent: React.FC<ChildrenProps & DragControlProps & AdditionalClassNames> = ({children, dragControls, className}) => {
  return (
    <div
      className={clsx(
        'h-12 inset-0 flex items-center absolute inset-0 z-50',
        className,
      )}
      onPointerDown={(e) => dragControls.start(e)}>
      {children}
    </div>
  )
}

export const Content: React.FC<ChildrenProps & AdditionalClassNames> = ({children, className}) => {
  return <div className={className}>{children}</div>
}

const WindowComponent: React.FC<ChildrenProps & AdditionalClassNames & DragControlProps> =
  ({
     children,
     className,
     dragControls,
   }) => {
    const store = useStore();
    const windowRef = useRef(null);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
      if (store.desktop && windowRef.current) {
        // console.log('fired')
        // const desktop = (store.desktop.current as Element);
        // const window = (windowRef.current as Element);
        // setTop((desktop.clientHeight / 2) - (window.clientHeight / 2));
        // setLeft((desktop.clientWidth / 2) - (window.clientWidth / 2));
        //
        // console.log(top, left)
      }
    });

    if (!store.desktop) return <></>

    return (
      <motion.div
        ref={windowRef}
        drag
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={store.desktop}
        dragListener={false}
        dragControls={dragControls}
        onDragStart={() => {
          document.documentElement.classList.add('noSelect');
        }}
        onDragEnd={() => {
          document.documentElement.classList.remove('noSelect');
        }}
        className={clsx(
          'rounded-lg',
          'text-zinc-900 dark:text-white transition-colors duration-200',
          'absolute top-0 left-0 shadow-lg',
          className
        )}>
        <div className="relative">
          {children}
        </div>
      </motion.div>
    )
  }

export const Window = Object.assign(WindowComponent, { DragAreaContent, Content })
