import styles from "./Header.module.scss";

export function Header() {
    return(
        <>
            <div className={styles.header}>
                <ul className={styles.Header_List}>
                    <li><a href="">Topページ</a></li>
                    <li><a href="">お店紹介</a></li>
                    <li><a href="">Topページ</a></li>
                    <li><button >Topページ</button></li>
                </ul>
            </div>
        </>
    );
};
