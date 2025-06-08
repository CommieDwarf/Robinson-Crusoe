import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";
import { ACTION } from "@shared/types/Game/ACTION";
import { Header } from "./Header/Header";
import { TransListItems } from "../../TransListItems/TransListItems";

export function RestPage() {
  const tPathS1 = "guide.pages.restPage.section1";

  return (
    <>
      <Header action={ACTION.REST} />
      <section>
        <ul className={styles.list}>
          <TransListItems baseTPath={`${tPathS1}.ul1`} liAmount={3} />
        </ul>
        <div className={styles.flexBlock}>
          <div className={styles.exampleGif}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment-rest.gif"}
              alt={"przydzielanie pionka"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
