import {useEffect, useState} from "react";
import {BarButton} from "../BarButton";

export const Clock: React.FC = () => {
  let timeout: NodeJS.Timeout | null = null
  const [timeString, setTimeString] = useState<string>('')

  const updateTime = () => {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();

    setTimeString(`${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m} ${h < 12 ? 'AM' : 'PM'}`)
  };

  useEffect(() => {
    updateTime();
  }, []);

  setTimeout(updateTime, 1000);

  return (
    <BarButton>
      <BarButton.Button>
        <p className="text-xs dark:text-white">Mon Apr 18 {timeString}</p>
      </BarButton.Button>
      <BarButton.Panel position="right">
        <p>Testing</p>
      </BarButton.Panel>
    </BarButton>
  )
}
