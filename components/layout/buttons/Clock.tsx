import {useEffect, useState} from "react";
import {BarButton} from "../BarButton";

export const Clock: React.FC = () => {
  let timeout: NodeJS.Timeout | null = null
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  let handle = 0;

  const weekday = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const updateTime = () => {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();

    setDateString(`${weekday[today.getDay()]} ${months[today.getMonth()]} ${today.getDate()}`);

    setTimeString(`${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m} ${h < 12 ? 'AM' : 'PM'}`);

    console.log('testing');
  };

  useEffect(() => {
    updateTime();

    setInterval(updateTime, 1000);
  }, []);

  return (
    <BarButton>
      <BarButton.Button>
        <p className="text-xs dark:text-white w-32">{dateString} {timeString}</p>
      </BarButton.Button>
    </BarButton>
  )
}
