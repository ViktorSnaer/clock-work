import React from "react";
import classes from "./Repetition.module.css";
import Star from "./SVGstar";

export default function Repetition(props) {
  const circles = props.reps.map((rep) => {
    return <Star key={rep.key} isFilled={rep.isCompleted} />;
  });

  return <div className={classes.container}>{circles}</div>;
}
