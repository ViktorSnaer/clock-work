import React, { useEffect, useState } from "react";

import classes from "./Clock.module.css";

export default function index() {
  const [countDown, setCountDown] = useState({
    minutes: 90,
    seconds: 0,
  });

  function handleOnClick() {
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev.seconds === 0 && prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.seconds === 0 && prev.minutes === 0) {
          clearInterval(interval);
          return { minutes: 90, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }

  return (
    <div className={classes.circle} onClick={handleOnClick}>
      <p className={classes.time}>
        {countDown.minutes}:
        {countDown.seconds < 10 ? `0${countDown.seconds}` : countDown.seconds}
      </p>
    </div>
  );
}
