import { useState } from "react";
import classes from "./Settings.module.css";

export default function Settings() {
  const [isOpen, setIsOpen] = useState({
    animation: classes.close,
    render: false,
  });

  function handleClick() {
    setIsOpen((prev) =>
      prev.animation === classes.close
        ? { render: true, animation: classes.open }
        : { ...prev, animation: classes.close }
    );
  }

  function handleAnimationEnd() {
    if (isOpen.animation === classes.close) {
      setIsOpen((prev) => {
        return { ...prev, render: false };
      });
    }
  }
  return (
    <>
      <button className={classes.settings} onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen.render && (
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`${classes.container} ${isOpen.animation}`}
        >
          <h3 className={classes.title}>Settings</h3>
          <form className={classes.form}>
            <label htmlFor="minutes">Set minutes from 0 - 99</label>
            <input
              type="number"
              id="minutes"
              placeholder="Minutes..."
              min="0"
              max="99"
            />
            <label htmlFor="seconds">Set seconds from 0 - 59</label>
            <input
              type="number"
              id="seconds"
              placeholder="Seconds..."
              min="0"
              max="59"
            />
            {/* <label htmlFor="showClock">Always display clock</label>
            <input type="checkbox" id="showClock" /> */}
          </form>
        </div>
      )}
    </>
  );
}
