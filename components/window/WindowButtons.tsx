import React from "react";
import styles from "./WindowButtons.module.sass";

export const WindowButtons: React.FC = () => {
  return (
    <div className="flex space-x-2">
      <button className={styles.buttonClose}/>
      <button className={styles.buttonMinimize}/>
      <button className={styles.buttonMaximize}/>
    </div>
  )
}
