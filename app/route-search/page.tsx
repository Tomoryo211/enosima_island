import { Header } from "../components/Header/Header";
import RouteSearch from "../components/RouteSearch/RouteSearch";
import styles from "../index.module.scss";

export default function RouteSearchPage() {
    return (
        <div className={styles.body} style={{ background: '#FDF4EC', minHeight: '100vh' }}>
            <Header />
            <div style={{ paddingTop: '20px' }}>
                <RouteSearch />
            </div>
        </div>
    );
}
