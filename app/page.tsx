
import {Header} from "./components/Header/Header";
import  styles  from "./index.module.scss";


export default function Home() {
  return(
    <div className={styles.body}>
      <Header />
    </div>
  )
}
