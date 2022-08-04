import { useState, useEffect } from "react";

const useTime = (interval) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, interval);
    return () => {
      clearInterval(timerID);
    };
  }, [interval]);

  return {
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),
  };
};

export default useTime;
