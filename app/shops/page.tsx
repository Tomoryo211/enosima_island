import { Header } from "../components/Header/Header";
import GooglePlaces from "../components/GooglePlaces/GooglePlaces";
import styles from "../index.module.scss";

export default function ShopsPage() {
    return (
        <div className={styles.body} style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            <Header />
            <div style={{ paddingTop: '50px' }}>
                <GooglePlaces />
            </div>
        </div>
    );
}
