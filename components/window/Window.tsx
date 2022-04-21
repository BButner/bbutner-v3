import {DragControls, motion} from "framer-motion";
import {AdditionalClassNames, ChildrenProps} from "../../lib/props";
import {useStore} from "../../lib/state/state";
import clsx from "clsx";
import {useEffect, useRef, useState} from "react";

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
        'h-12 inset-0 flex items-center absolute inset-0 z-30',
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
    const [translateX, setTranslateX] = useState('');
    const [translateY, setTranslateY] = useState('');

    useEffect(() => {
      if (store.desktop && windowRef.current && top === 0 && left === 0) {
        console.log(top, left, windowId)
        const desktop = (store.desktop.current as Element);
        const window = (windowRef.current as Element);
        const centerTop = (desktop.clientHeight / 2) - (window.clientHeight / 2);
        const centerLeft = (desktop.clientWidth / 2) - (window.clientWidth / 2);
        const savedX = localStorage.getItem(`${windowId}X`);
        const savedY = localStorage.getItem(`${windowId}Y`);

        setTop(centerTop + Number(savedY));
        setLeft(centerLeft + Number(savedX));
      }
    }, [store.desktop]);

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
          if (windowRef.current) {
            const w = (windowRef.current as Element);
            const matrix = new WebKitCSSMatrix(window.getComputedStyle(w).transform);

            const prevX = localStorage.getItem(`${windowId}X`);
            const prevY = localStorage.getItem(`${windowId}Y`);

            if (prevX && prevY) {
              localStorage.setItem(`${windowId}X`, (matrix.m41 + Number(prevX)).toString());
              localStorage.setItem(`${windowId}Y`, (matrix.m42 + Number(prevY)).toString());
            } else {
              localStorage.setItem(`${windowId}X`, matrix.m41.toString());
              localStorage.setItem(`${windowId}Y`, matrix.m42.toString());
            }
          }
        }}
        style={{top, left, transform: `translate(${translateX}px,${translateY}px)`}}
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
