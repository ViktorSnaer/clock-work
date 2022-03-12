import React from "react";
import classes from "./Repetition.module.css";

export default function Repetition(props) {
  const circles = props.reps.map((rep) => {
    const styles = {
      backgroundColor: rep.isCompleted ? "green" : "red",
    };

    return <div key={rep.key} style={styles} className={classes.circle}></div>;
  });

  return <div className={classes.container}>{circles}</div>;
}
