"use client";

import { Header } from "./components/Header/Header";
import styles from "./index.module.scss";
import Image from "next/image";
import Torii from "./components/Torii/torii";
import Shop from "./components/Shop/shop";
import ShopMore from "./components/ShopMore/ShopMore";

export default function Home() {
  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.heroSection}>
        <Image
          src="/main2.png"
          alt="背景"
          className={styles.img}
          priority
          width={1920}
          height={1080}
        />
        <div className={styles.heroTitleContainer}>
          <h1 className={styles.mainTitle}>江ノ島</h1>
          <p className={styles.subTitle}>ENOSHIMA ISLAND</p>
        </div>
      </div>
      <Torii />
      <div>
        <Shop />
      </div>
      <ShopMore />
    </div>
  );
}
