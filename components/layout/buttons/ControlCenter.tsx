import {BarButton} from "../BarButton";
import styles from "./ControlCenter.module.sass";

export const ControlCenter: React.FC = () => {
  return (
    <BarButton>
      <BarButton.Button>
        <div>
          <div className={styles.toggleOff}/>
          <div className={styles.toggleOn}/>
        </div>
      </BarButton.Button>
    </BarButton>
  )
}
