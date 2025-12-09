
import {Header} from "./components/Header/Header";
import  styles  from "./index.module.scss";
import Image from "next/image";
import Top from "./Images/mainvisual.jpg";


export default function Home() {
  return(
    <div className={styles.body}>
      <Header />
      <Image src={Top} alt="mainvisual" />
    </div>
  )
}
