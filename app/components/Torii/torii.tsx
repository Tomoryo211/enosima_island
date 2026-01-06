"use client";

import { useEffect } from "react";
import styles from "./torii.module.scss";

export default function torii(){
useEffect(() => {
    const canvas = document.getElementById("wave") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = 250;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#BDE9F2";
        ctx.beginPath();
        ctx.moveTo(0, 120);
        ctx.quadraticCurveTo(
        canvas.width * 0.25, 300,
        canvas.width * 0.5, 130
    );
        ctx.quadraticCurveTo(
            canvas.width * 0.75, 10,
            canvas.width, 120
        );
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
        window.removeEventListener("resize", resize);
    };
    }, []);

return (
    <>
        <div className={styles.bronze}>
            <h1 className={styles.torii}>青銅の鳥居の説明</h1>
                <p className={styles.About}>
                    江ノ島弁財天参拝の玄関口となる鳥居です。古くは木製の鳥居でしたが、<br />
                    1821年に青銅製で再建されました。鳥居の柱には再建に尽力した大勢の<br />
                    人々の名前を刻まれており、信仰の篤さを物語っています。正面の額には<br />
                    「江島大明寺」と書かれていますが、特徴的な筆跡は弁財天のお使いで<br />
                    ある蛇をかたどっています。鎌倉時代に、我が国もにモンゴル軍が襲来<br />
                    した戦い(文永の役)で敵側が退散した事への神恩感謝として第91代の<br />
                    後宇多天皇が奉納したとされる勅額(天皇から賜った額)を写したものです。<br />
                    1997年に藤沢市の指定文化財に登録されました。
                </p>
        </div>
    <canvas id="wave" className={styles.wave}></canvas>
    </>
    )
}