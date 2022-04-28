import React from "react";
import styles from "./WindowButtons.module.sass";
import {WindowProps} from "./Window";
import {useStore} from "../../lib/state/state";
import {AdditionalClassNames} from "../../lib/props";
import clsx from "clsx";

export const WindowButtons: React.FC<WindowProps & AdditionalClassNames> = ({windowId, className}) => {
  const store = useStore();

  const closeWindow = () => {
    store.closeWindow(windowId);
  }

  const minimizeWindow = () => {
    store.minimizeWindow(windowId);
  }

  return (
    <div className={clsx(
      'flex space-x-2',
      className
    )}>
      <button className={styles.buttonClose} onClick={closeWindow}/>
      <button className={styles.buttonMinimize} onClick={minimizeWindow}/>
      <button className={styles.buttonMaximize}/>
    </div>
  )
}
