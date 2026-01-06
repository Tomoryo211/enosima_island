"use client";

import style from "./shop.module.scss";
import Image from "next/image";

export default function Shop(){
    return(
        <>
        <div>
            <h2 className={style.shop}>現在営業中店舗</h2>
        </div>
        </>
    )
}