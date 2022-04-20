import {AdditionalClassNames, ChildrenProps} from "../../lib/props";
import clsx from "clsx";
import {Menu, Popover} from "@headlessui/react";
import styles from "./BarButton.module.sass";

interface PanelProps {
  position: 'left' | 'right';
}

export const Button: React.FC<ChildrenProps & AdditionalClassNames> = ({children, className}) => {
  return (
    <Popover.Button className={clsx(
      'active:bg-black/10 dark:active:bg-white/10 px-2.5 rounded h-[26px] m-0 flex items-center justify-center',
      'outline-none',
      className,
    )}>{children}</Popover.Button>
  )
}

export const Panel: React.FC<ChildrenProps & AdditionalClassNames & PanelProps> = ({children, className, position}) => {
  return (
    <Popover.Panel className={clsx(
      'absolute bg-white/50 dark:bg-dark-content/70 dark:text-white left-0 top-full mt-[8px] origin-top-right outline-none rounded',
      'backdrop-blur-lg text-xs text-gray-800 whitespace-nowrap p-2 space-y-1 w-auto w-fit shadow-lg',
      position === 'left' ? 'left-0' : 'right-0',
      className
    )}>
      {children}
    </Popover.Panel>
  )
}

const BarButtonComponent: React.FC<ChildrenProps & AdditionalClassNames> = ({children, className}) => {
  return (
    <Popover className={clsx(
      'relative',
      className
    )}>
      {children}
    </Popover>
  )
}

export const BarButton = Object.assign(BarButtonComponent, { Button, Panel })
