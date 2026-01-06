
import {Header} from "./components/Header/Header";
import  styles  from "./index.module.scss";
import Image from "next/image";
import back from "./Images/main2.png";


export default function Home() {
  return(
    <div className={styles.body}>
      <Header />
      <Image src={back}  alt="背景" className={styles.img}/>
      <div>
        
      </div>
    </div>
  )
}
