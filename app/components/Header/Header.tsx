import styles from "./Header.module.scss";
import Image from "next/image";

export function Header() {
    return (
        <>
            <div className={styles.header}>
                <a href="/"><Image
                    src="/enosima.jpg"
                    alt="ロゴ"
                    className={styles.img}
                    priority
                    width={100}
                    height={100}
                /></a>
                <ul className={styles.Header_List}>
                    <li><a href="/">topページ</a></li>
                    <li><a href="/shops">お店紹介</a></li>
                    <li><a href="/route-search">ルート提案</a></li>
                </ul>
            </div>
        </>
    );
};
