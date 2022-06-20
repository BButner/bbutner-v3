import React from "react";
import styles from "./WindowButtons.module.sass";
import {WindowProps} from "./Window";
import {AdditionalClassNames} from "../../lib/props";
import clsx from "clsx";
import { useAtom } from "jotai";
import {StateManagerWindow, stateWindow} from "lib/state/state";

export const WindowButtons: React.FC<WindowProps & AdditionalClassNames> = ({windowId, className}) => {
  const windowState = useAtom(stateWindow);

  const closeWindow = () => {
    StateManagerWindow.closeWindow(windowState, windowId);
  }

  const minimizeWindow = () => {
    StateManagerWindow.minimizeWindow(windowState, windowId);
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
