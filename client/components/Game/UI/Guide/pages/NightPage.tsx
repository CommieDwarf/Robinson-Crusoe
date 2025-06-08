import DynamicImage from "../../../../DynamicImage/DynamicImage";
import guideStyles from "../Guide.module.css";
import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import { getTPath } from "../getTPath";
import { TransListItems } from "../TransListItems/TransListItems";

export function NightPage() {
  const { t } = useTranslation();

  const tPath = getTPath("nightPage");

  return (
    <>
      <Header
        title={t("phase.phase", { phase: "night" })}
        img={"/UI/phase/night.webp"}
      />
      <section>
        <ul className={guideStyles.list}>
          <TransListItems baseTPath={tPath(1, "ul1")} liAmount={5} />
        </ul>

        <div className={guideStyles.flexBlock}>
          <div className={guideStyles.exampleGif} style={{ height: "250px" }}>
            <DynamicImage
              src={"/UI/guide/camp-movement.gif"}
              alt="przenoszenie obozu"
            />
          </div>
        </div>
      </section>
    </>
  );
}
