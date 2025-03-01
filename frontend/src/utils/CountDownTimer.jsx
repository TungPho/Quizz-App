import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ minutes, setIsFinished }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60); // Chuyển phút thành giây

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    } // Nếu hết giờ thì dừng lại

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup khi component bị unmount
  }, [setIsFinished, timeLeft]);

  // Hàm chuyển đổi giây -> hh:mm:ss
  const formatTime = (seconds) => {
    const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  return <h1>{formatTime(timeLeft)}</h1>;
};

export default CountdownTimer;
