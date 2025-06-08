import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";
import { ACTION } from "@shared/types/Game/ACTION";
import { Header } from "./Header/Header";
import { Trans, useTranslation } from "react-i18next";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";
import { Icon } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import { TransListItems } from "../../TransListItems/TransListItems";

export function BuildPage() {
  const { t } = useTranslation();

  const tPath = "guide.pages.buildPage";
  const tPathS1 = `${tPath}.section1`;
  const tPathS2 = `${tPath}.section2`;

  return (
    <>
      <Header action={ACTION.BUILD} />
      <section>
        <ul className={styles.list}>
          {/*{[1, 2, 3, 4].map((liNum) => {*/}
          {/*  return (*/}
          {/*    <li key={liNum}>{t([`${tPathS1}.ul1.li${liNum}`]) as string}</li>*/}
          {/*  );*/}
          {/*})}*/}
        </ul>
      </section>
      <section>
        <ul className={styles.list}>
          <TransListItems
            liAmount={5}
            baseTPath={`${tPathS2}.ul1`}
            img={[
              "/UI/constructions/shelter-icon.webp",
              "/UI/constructions/roof-icon.webp",
              "/UI/constructions/palisade-icon.webp",
              "/UI/constructions/weapon-icon.webp",
              "/UI/inventions/normal/moat.webp",
            ]}
            components={{ strong: <strong />, br: <br /> }}
          />
        </ul>
        <p>{t(`${tPathS2}.paragraph1`)}</p>
        <div className={styles.flexBlock}>
          <div className={styles.exampleGif}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment-build.gif"}
              alt="przydzielanie pionka"
            />
          </div>
        </div>
      </section>
    </>
  );
}
