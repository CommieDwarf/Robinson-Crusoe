import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";
import { ACTION } from "@shared/types/Game/ACTION";
import { Header } from "./Header/Header";
import { TransListItems } from "../../TransListItems/TransListItems";

export function ArrangeCampPage() {
  const tPathS1 = "guide.pages.arrangeCampPage.section1";

  return (
    <>
      <Header action={ACTION.ARRANGE_CAMP} />
      <section>
        <ul className={styles.list}>
          <TransListItems liAmount={3} baseTPath={`${tPathS1}.ul1`} />
        </ul>
        <div className={styles.flexBlock}>
          <div className={styles.exampleGif}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment-arrange-camp.gif"}
              alt={"przydzielanie pionka"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
