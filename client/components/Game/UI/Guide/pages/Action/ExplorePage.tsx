import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { insertIcon } from "../../Guide";
import styles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";
import { ACTION } from "@shared/types/Game/ACTION";
import { Header } from "./Header/Header";
import { TransListItems } from "../../TransListItems/TransListItems";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";

export function ExplorePage() {
  const { t } = useTranslation();
  const tPath = "guide.pages.explorePage";
  const tPathS1 = `${tPath}.section1`;

  return (
    <>
      <Header action={ACTION.EXPLORE} />
      <section>
        <ul className={styles.list}>
          <TransListItems liAmount={3} baseTPath={`${tPathS1}.ul1`} />
        </ul>
        <div className={styles.flexBlock}>
          <div className={styles.exampleImg}>
            <DynamicImage src={"/UI/map/tiles/8.webp"} alt={"kafelek"} />
          </div>
          <div className={styles.exampleGif}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment-explore.gif"}
              alt={"przydzielanie pionka"}
            />
          </div>
        </div>
        <ul className={styles.list}>
          <TransListItems
            liAmount={6}
            baseTPath={`${tPathS1}.ul2`}
            img={[
              "/UI/misc/parrot.webp",
              "/UI/misc/beast.webp",
              "/UI/misc/discovery-token.webp",
              "/UI/misc/natural-shelter.webp",
              "/UI/misc/totem.webp",
              "/UI/misc/terrain.webp",
            ]}
            components={{ Icon: <Icon />, strong: <strong /> }}
          />
        </ul>
      </section>
    </>
  );
}
