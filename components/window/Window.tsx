import {DragControls, motion} from "framer-motion";
import {AdditionalClassNames, ChildrenProps} from "../../lib/props";
import clsx from "clsx";
import {useEffect, useRef, useState} from "react";
import {stateDesktop, stateWindow} from "../../lib/state/state";
import { useAtom } from "jotai";

export interface WindowProps {
  windowId: string;
}

interface DragControlProps {
  dragControls: DragControls;
}

export const DragAreaContent: React.FC<ChildrenProps & DragControlProps & AdditionalClassNames> =
  ({
     children,
     dragControls,
     className
   }) => {
    return (
      <div
        className={clsx(
          'h-12 inset-0 flex items-center absolute inset-0 z-30',
          className,
        )}
        onPointerDown={(e) => {
          dragControls.start(e, {snapToCursor: false, cursorProgress: {x: 50, y: 50}})
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
    const [desktopState] = useAtom(stateDesktop);
    const [windowState, setWindowState] = useAtom(stateWindow);
    const windowRef = useRef(null);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [initialLeft, setInitialLeft] = useState(0);
    const [initialTop, setInitialTop] = useState(0);

    useEffect(() => {
      if (desktopState.desktop && windowRef.current && top === 0 && left === 0) {
        const desktop = (desktopState.desktop.current as Element);
        const window = (windowRef.current as Element);
        const centerTop = (desktop.clientHeight / 2) - (window.clientHeight / 2);
        const centerLeft = (desktop.clientWidth / 2) - (window.clientWidth / 2);
        const savedLeft = localStorage.getItem(`${windowId}Left`);
        const savedTop = localStorage.getItem(`${windowId}Top`);

        if (savedTop && savedLeft) {
          let top = Number(savedTop);
          let left = Number(savedLeft);

          if (top < 0 || top > window.clientHeight) top = centerTop;
          if (left < 0 || left > window.clientWidth) left = centerLeft;

          setTop(top);
          setInitialTop(top);
          setLeft(left);
          setInitialLeft(left);
        } else {
          setTop(centerTop);
          setLeft(centerLeft);
        }
      }
    }, [desktopState.desktop]);

    if (!desktopState.desktop) return <></>

    return (
      <motion.div
        onPointerDown={() => {
          setWindowState({
            ...windowState,
            activeWindowId: windowId
          });
        }}
        ref={windowRef}
        drag
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={desktopState.desktop}
        dragListener={false}
        dragControls={dragControls}
        onDragStart={() => {
          document.documentElement.classList.add('noSelect');
        }}
        onDragEnd={() => {
          document.documentElement.classList.remove('noSelect');
          if (windowRef.current && desktopState.desktop) {
            const w = (windowRef.current as Element);
            const desktop = (desktopState.desktop.current as Element);
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
          windowState.activeWindowId === windowId ? 'z-40' : '',
          windowState.minimizedWindowIds.includes(windowId) ? 'hidden' : '',
          className
        )}>
        <div className="relative">
          {children}
        </div>
      </motion.div>
    )
  }

export const Window = Object.assign(WindowComponent, {DragAreaContent, Content})
