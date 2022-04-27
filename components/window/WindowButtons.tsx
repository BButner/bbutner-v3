import React from "react";
import styles from "./WindowButtons.module.sass";
import {WindowProps} from "./Window";
import {useStore} from "../../lib/state/state";

export const WindowButtons: React.FC<WindowProps> = ({windowId}) => {
  const store = useStore();

  const closeWindow = () => {
    store.closeWindow(windowId);
  }

  const minimizeWindow = () => {
    store.minimizeWindow(windowId);
  }

  return (
    <div className="flex space-x-2">
      <button className={styles.buttonClose} onClick={closeWindow}/>
      <button className={styles.buttonMinimize} onClick={minimizeWindow}/>
      <button className={styles.buttonMaximize}/>
    </div>
  )
}
