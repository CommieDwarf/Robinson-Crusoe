import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { insertIcon } from "../../Guide";
import styles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";
import { ACTION } from "@shared/types/Game/ACTION";
import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import { TransListItems } from "../../TransListItems/TransListItems";
import { Icon } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";

export function GatherPage() {
  const { t } = useTranslation();

  const tPath = "guide.pages.gatherPage";
  const tPathS1 = `${tPath}.section1`;
  const tPathS2 = `${tPath}.section2`;

  return (
    <>
      <Header action={ACTION.GATHER} />
      <section>
        <ul className={styles.list}>
          {<TransListItems liAmount={5} baseTPath={`${tPathS1}.ul1`} />}
        </ul>
      </section>
      <section>
        <div className={styles.flexBlock}>
          <div className={styles.exampleImg}>
            <DynamicImage src={"/UI/map/tiles/0.webp"} alt={"kafelek"} />
          </div>
          <div className={styles.exampleGif}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment-gather.gif"}
              alt={"przydzielanie pionka"}
            />
          </div>
        </div>
        <p className={styles.p}>{t(`${tPathS2}.paragraph1`)}</p>
        <ul className={styles.list}>
          <TransListItems
            liAmount={3}
            baseTPath={`${tPathS2}.ul1`}
            img={[
              "/UI/misc/parrot.webp",
              "/UI/misc/fish.webp",
              "/UI/misc/wood.webp",
            ]}
            components={{
              strong: <strong />,
              Icon: <Icon />,
            }}
          />
        </ul>
      </section>
    </>
  );
}
