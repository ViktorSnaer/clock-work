import { useState } from "react";

import Head from "next/head";

import classes from "../styles/Home.module.css";

import Clock from "../components/clock/index";
import Repetition from "../components/Repetition";

export default function Home() {
  const [reps, setReps] = useState([
    { key: 0, isCompleted: false },
    { key: 1, isCompleted: false },
    { key: 2, isCompleted: false },
  ]);

  function countdownFinished() {
    let updated = false;
    setReps((prev) => {
      return prev.map((rep) => {
        if (!rep.isCompleted && !updated) {
          updated = true;
          return { ...rep, isCompleted: true };
        } else {
          return { ...rep };
        }
      });
    });
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>Clock Work</title>
        <meta
          name="description"
          content="Productivity app that sets a timer for 90 minutes focused sessions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Repetition reps={reps} />
        <Clock countdownFinished={countdownFinished} />
      </main>
    </div>
  );
}
