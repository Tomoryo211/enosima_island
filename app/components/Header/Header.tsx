import styles from "./Header.module.scss";
import Image from "next/image";
import enosima from "../../Images/enosima.jpg";

export function Header() {
    return (
        <>
            <div className={styles.header}>
                <a href="/"><Image 
                    src={enosima}
                    alt="ロゴ"
                    className={styles.img}
                    priority 
                /></a>
                <ul className={styles.Header_List}>
                    <li><a href="/">Topページ</a></li>
                    <li><a href="/shops">お店紹介</a></li>
                    <li><a href="/">Topページ</a></li>
                </ul>
            </div>
        </>
    );
};
