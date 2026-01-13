"use client";

import style from "./shop.module.scss";
import Image from "next/image";

export default function Shop(){
    return(
        <>
        <div>
            <h2 className={style.shop}>現在営業中店舗</h2>
            <section className={style.input_area}>
                <form action="./search/" className={style.input}>
                    <input type="text" id="movie" name="q" className={style.input_field}/>
                    <button type="submit" className={style.btn}>検索</button>
                </form>
            </section>
            <div>
                <button>飲食</button>
                <button>体験</button>
            </div>
        </div>
        </>
    )
}