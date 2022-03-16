import React, { useEffect, useState } from "react";

import classes from "./Clock.module.css";

export default function index(props) {
  const clockMinutes = 90;
  const clockSeconds = 0;

  const [countDown, setCountDown] = useState({
    minutes: clockMinutes,
    seconds: clockSeconds,
    clockOn: false,
  });

  function handleOnClick() {
    setCountDown((prev) => {
      return { ...prev, clockOn: !prev.clockOn };
    });

    handleInterval();
  }

  function playCompleteSound() {
    let audio = new Audio("assets/complete.mp3");
    audio.play();
  }

  function handleInterval() {
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (!prev.clockOn) {
          clearInterval(interval);
          return {
            ...prev,
          };
        } else if (prev.seconds === 0 && prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59, clockOn: true };
        } else if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.seconds === 0 && prev.minutes === 0) {
          clearInterval(interval);
          props.countdownFinished();
          playCompleteSound();
          return {
            minutes: clockMinutes,
            seconds: clockSeconds,
            clockOn: false,
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }

  return (
    <div className={classes.circle} onClick={handleOnClick}>
      <p className={classes.time}>
        {countDown.minutes < 10 ? `0${countDown.minutes}` : countDown.minutes}:
        {countDown.seconds < 10 ? `0${countDown.seconds}` : countDown.seconds}
      </p>
    </div>
  );
}
