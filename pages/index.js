import Head from "next/head";

import classes from "../styles/Home.module.css";

import Clock from "../components/clock/index";

export default function Home() {
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
      <Clock />
    </div>
  );
}
