import {DragControls, motion, useDragControls} from "framer-motion";
import {AdditionalClassNames, ChildrenProps} from "../../lib/props";
import styles from "./Window.module.sass";
import {useStore} from "../../lib/state/state";
import clsx from "clsx";
import {WindowButtons} from "./WindowButtons";
import {RefObject, useEffect, useRef, useState} from "react";

export interface WindowProps {
  windowId: string;
}

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

const WindowComponent: React.FC<ChildrenProps & AdditionalClassNames & DragControlProps & WindowProps> =
  ({
     children,
     className,
     dragControls,
     windowId
   }) => {
    const store = useStore();
    const windowRef = useRef(null);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
      if (store.desktop && windowRef.current && top === 0 && left === 0) {
        const desktop = (store.desktop.current as Element);
        const window = (windowRef.current as Element);
        setTop((desktop.clientHeight / 2) - (window.clientHeight / 2));
        setLeft((desktop.clientWidth / 2) - (window.clientWidth / 2));
      }
    }, [store.desktop, store.activeWindowId]);

    if (!store.desktop) return <></>

    return (
      <motion.div
        onPointerDown={() => {
          useStore.setState({ activeWindowId: windowId });
        }}
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
        style={{top, left}}
        className={clsx(
          'rounded-lg',
          'text-zinc-900 dark:text-white transition-colors transition-opacity duration-200',
          'absolute shadow-lg',
          top == 0 && left == 0 ? 'opacity-0' : 'opacity-1',
          store.activeWindowId === windowId ? 'z-40' : '',
          className
        )}>
        <div className="relative">
          {children}
        </div>
      </motion.div>
    )
  }

export const Window = Object.assign(WindowComponent, { DragAreaContent, Content })
