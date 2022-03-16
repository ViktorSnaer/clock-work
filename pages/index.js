import { useState, useEffect } from "react";
import Image from "next/image";

import Head from "next/head";

import classes from "../styles/Home.module.css";

import Clock from "../components/clock/index";
import Repetition from "../components/Repetition";

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
        <button className={classes.settings}>
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
