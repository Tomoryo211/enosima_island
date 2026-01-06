"use client";

import { Header } from "./components/Header/Header";
import styles from "./index.module.scss";
import Image from "next/image";
import back from "./Images/main2.png";
import Torii from "./components/Torii/torii";

export default function Home() {
  return (
    <div className={styles.body}>
      <Header />
      <Image
        src={back}
        alt="背景"
        className={styles.img}
        priority
      />
      <Torii />
      <div>
        
      </div>
    </div>
  );
}
