"use client";

import { useEffect } from "react";
import styles from "./torii.module.scss";

export default function Torii() {
  useEffect(() => {
    const canvas = document.getElementById("wave") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 150;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawWave = (offset: number, amplitude: number, frequency: number, color: string, opacity: number) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();

        // Fill from the TOP to create a seamless flow from the .bronze background
        ctx.moveTo(0, 0);
        for (let x = 0; x <= canvas.width; x++) {
          const y = offset + Math.sin(x * frequency + time) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      // Ensure the color exactly matches the new #7dd3fc background
      // Main solid wave
      drawWave(60, 40, 0.002, "#7dd3fc", 1.0);

      // Sub-wave for gentle movement effect
      drawWave(75, 30, 0.0015, "rgba(125, 211, 252, 0.6)", 1.0);

      time += speed * 0.4;
      requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <section className={styles.bronze}>
        <h1 className={styles.torii}>青銅の鳥居とは</h1>
        <p className={styles.About}>
          江ノ島弁財天参拝の玄関口となる鳥居です。古くは木製の鳥居でしたが、
          1821年に青銅製で再建されました。鳥居の柱には再建に尽力した大勢の
          人々の名前を刻まれており、信仰の篤さを物語っています。正面の額には
          「江島大明寺」と書かれていますが、特徴的な筆跡は弁財天のお使いで
          ある蛇をかたどっています。鎌倉時代に、我が国にモンゴル軍が襲来
          した戦い(文永の役)で敵側が退散した事への神恩感謝として第91代の
          後宇多天皇が奉納したとされる勅額(天皇から賜った額)を写したものです。
          1997年に藤沢市の指定文化財に登録されました。
        </p>
      </section>
      <div className={styles.waveContainer}>
        <canvas id="wave" className={styles.wave}></canvas>
      </div>
    </>
  );
}