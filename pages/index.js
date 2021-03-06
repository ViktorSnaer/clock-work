import { useState } from "react";
import Image from "next/image";
import { createApi } from "unsplash-js";

import Head from "next/head";

import classes from "../styles/Home.module.css";

import Clock from "../components/clock/index";
import Repetition from "../components/Repetition";
import Settings from "../components/settings";

export default function Home(props) {
  const backgroundArr = [...props.backgroundData];

  const [background, setBackground] = useState({ ...backgroundArr[0], num: 1 });

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
        num: prev.num < backgroundArr.length - 1 ? prev.num + 1 : 0,
      };
    });
  }

  const [time, setTime] = useState({
    minutes: 90,
    seconds: 0,
    showClock: false,
  });

  function configTime(e) {
    const { value, name, type, checked } = e;
    const valueToNumber = Number(value);
    setTime((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : valueToNumber };
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
        <Settings configTime={(e) => configTime(e)} time={time} />
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
        <Clock countdownFinished={countdownFinished} time={time} />
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

export async function getStaticProps() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  const unsplash = new createApi({
    accessKey: accessKey,
  });

  const images = await unsplash.search.getPhotos({
    query: "nature",
    page: 1,
    perPage: 10,
  });

  let backgroundData;
  if (images.status !== 200) {
    backgroundData = [
      {
        img: "https://images.unsplash.com/photo-1652543549421-ea252bd209f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        description: "",
      },
      {
        img: "https://images.unsplash.com/photo-1506261423908-ea2559c1f24c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80",
        description: "",
      },
    ];
  } else {
    backgroundData = await images.response.results.map((img) => {
      return { img: img.urls.regular, description: img.description };
    });
  }

  return {
    props: { backgroundData },
  };
}
