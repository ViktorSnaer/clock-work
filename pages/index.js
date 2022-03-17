import { useState, useEffect } from "react";
import Image from "next/image";

import Head from "next/head";

import classes from "../styles/Home.module.css";

import Clock from "../components/clock/index";
import Repetition from "../components/Repetition";
import Settings from "../components/settings";

export default function Home() {
  const [backgroundArr, setBackgroundArr] = useState([
    {
      img: "https://images.unsplash.com/photo-1645464619320-6bd3702dc2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDk3ODd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDcxODEyMzY&ixlib=rb-1.2.1&q=80&w=1080",
      description: "default photo",
    },
  ]);

  const [background, setBackground] = useState({ ...backgroundArr[0], num: 0 });

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    fetch(`https://api.unsplash.com/photos?client_id=${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        const backgroundData = data.map((img) => {
          return { img: img.urls.regular, description: img.description };
        });

        setBackgroundArr(backgroundData);
      });
  }, []);

  useEffect(() => {
    setBackground((prev) => {
      return {
        ...backgroundArr[prev.num],
        num: prev.num < 9 ? prev.num + 1 : 0,
      };
    });
  }, [backgroundArr]);

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

  function newImage() {
    setBackground((prev) => {
      return {
        ...backgroundArr[prev.num],
        num: prev.num < 9 ? prev.num + 1 : 0,
      };
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
        <Settings />
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
      <button onClick={newImage} className={classes.testButton}>
        <svg
          width="35"
          height="35"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
}
