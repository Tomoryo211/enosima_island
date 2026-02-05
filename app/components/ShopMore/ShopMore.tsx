"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ShopMore.module.scss";

export default function ShopMore() {
    useEffect(() => {
        const canvas = document.getElementById("shop-more-wave") as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let time = 0;
        const resize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || 600;
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const drawWave = (offset: number, amplitude: number, freq: number, color: string, speedShift: number) => {
                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x++) {
                    const y = offset + Math.sin(x * freq + time * speedShift) * amplitude;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.fillStyle = color;
                ctx.fill();
            };

            // 🌊 Stronger, more energetic sea waves animation
            drawWave(canvas.height * 0.35, 55, 0.003, "rgba(56, 189, 248, 0.45)", 1.1);
            drawWave(canvas.height * 0.45, 45, 0.004, "rgba(14, 165, 233, 0.35)", 0.7);
            drawWave(canvas.height * 0.25, 65, 0.0015, "rgba(186, 230, 253, 0.25)", 0.4);
            drawWave(canvas.height * 0.4, 35, 0.006, "rgba(255, 255, 255, 0.15)", 1.4); // Fast foam wave

            time += 0.025;
            requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <section className={styles.shopMoreContainer}>
            <canvas id="shop-more-wave" className={styles.waveBackground}></canvas>

            <div className={styles.contentWrapper}>
                <div className={styles.imageSection}>
                    <Image
                        src="/shop.png"
                        alt="お店の詳細案内"
                        className={styles.shopImg}
                        priority
                        width={600}
                        height={400}
                    />
                </div>

                <div className={styles.textSection}>
                    <h2 className={styles.title}>お店の詳細はこちらから</h2>
                    <Link href="/shops" className={styles.moreButton}>
                        もっと見る
                    </Link>
                </div>
            </div>
        </section>
    );
}
