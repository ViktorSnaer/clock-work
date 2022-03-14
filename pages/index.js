import { useState } from "react";
import Image from "next/image";

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

  const [background, setBackground] = useState({
    img: "https://images.unsplash.com/photo-1645464619320-6bd3702dc2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDk3ODd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDcxODEyMzY&ixlib=rb-1.2.1&q=80&w=1080",
    description: "default photo",
  });

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

  function fetchApi() {
    const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    fetch(
      `https://api.unsplash.com/topics/wallpapers/photos?client_id=${clientId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const randomNum = Math.floor(Math.random() * 10);
        setBackground({
          img: data[randomNum].urls.regular,
          description: data[randomNum].description,
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
        <h2 className={classes.backgroundDescription}>
          {background.description}
        </h2>
        <Image
          className={classes.backgroundImage}
          src={background.img}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt=""
        />
        <Repetition reps={reps} />
        <Clock countdownFinished={countdownFinished} />
      </main>
      <button onClick={fetchApi} className={classes.testButton}>
        New Image
      </button>
    </div>
  );
}
