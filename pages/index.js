import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trade domains with me</title>
        <link rel="icon" href="/favicon.ico" />

        <h2>Trade domains with me</h2>
      </Head>
    </div>
  );
}
