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
      onPointerDown={(e) => {
        dragControls.start(e, { snapToCursor: false, cursorProgress: { x: 50, y: 50 } })
      }}>
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
    const [initialLeft, setInitialLeft] = useState(0);
    const [initialTop, setInitialTop] = useState(0);

    useEffect(() => {
      if (store.desktop && windowRef.current && top === 0 && left === 0) {
        const desktop = (store.desktop.current as Element);
        const window = (windowRef.current as Element);
        const centerTop = (desktop.clientHeight / 2) - (window.clientHeight / 2);
        const centerLeft = (desktop.clientWidth / 2) - (window.clientWidth / 2);
        const savedLeft = localStorage.getItem(`${windowId}Left`);
        const savedTop = localStorage.getItem(`${windowId}Top`);

        if (savedTop && savedLeft) {
          setTop(Number(savedTop));
          setInitialTop(Number(savedTop));
          setLeft(Number(savedLeft));
          setInitialLeft(Number(savedLeft));
        } else {
          setTop(centerTop);
          setLeft(centerLeft);
        }
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
          if (windowRef.current && store.desktop) {
            const w = (windowRef.current as Element);
            const desktop = (store.desktop.current as Element);
            const savedLeft = localStorage.getItem(`${windowId}Left`);
            const savedTop = localStorage.getItem(`${windowId}Top`);
            const matrix = new WebKitCSSMatrix(window.getComputedStyle(w).transform);

            if (savedTop && savedLeft) {
              localStorage.setItem(`${windowId}Top`, (initialTop + matrix.m42).toString());
              localStorage.setItem(`${windowId}Left`, (initialLeft + matrix.m41).toString());
            } else {
              const centerTop = (desktop.clientHeight / 2) - (w.clientHeight / 2);
              const centerLeft = (desktop.clientWidth / 2) - (w.clientWidth / 2);
              localStorage.setItem(`${windowId}Top`, (centerTop + matrix.m42).toString());
              localStorage.setItem(`${windowId}Left`, (centerLeft + matrix.m41).toString());
            }
          }
        }}
        style={{top: top + 'px', left: left + 'px'}}
        className={clsx(
          'rounded-lg',
          'text-zinc-900 dark:text-white transition-colors transition-opacity duration-200',
          'absolute shadow',
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
