import styles from "./Header.module.scss";

export function Header() {
    return(
        <>
            <div className={styles.header}>
                <ul className={styles.Header_List}>
                    <li>Topページ</li>
                    <li>お店紹介</li>
                    <li>Topページ</li>
                    <li>Topページ</li>
                </ul>
            </div>
        </>
    );
};
