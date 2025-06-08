import {
  Icon,
  insertIconsIntoText,
} from "../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import guideStyles from "../Guide.module.css";
import { ImgListItem } from "../ImgList.tsx/ImgListItem";
import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import { TransListItems } from "../TransListItems/TransListItems";
import { getTPath, TPath } from "../getTPath";

export function WeatherPage() {
  const { t } = useTranslation();

  const tPath: TPath = getTPath("weatherPage");

  return (
    <>
      <Header
        title={t("phase.phase", { phase: "weather" })}
        img={
          <DynamicImage
            src={"/UI/phase/weather.webp"}
            alt={t("phase.weather")}
          />
        }
      />
      <section>
        <p className={guideStyles.p}>{t(`${tPath(1)}.paragraph1`)}</p>
      </section>
      <section>
        <h2 className={guideStyles.subTitle}>{t(`${tPath(2)}.title`)}</h2>
        <ul className={guideStyles.list}>
          <TransListItems
            baseTPath={`${tPath(2)}.ul`}
            img={[
              "/UI/dice/weather/rain/rain.webp",
              "/UI/dice/weather/winter/snow.webp",
              "/UI/dice/weather/animals/beast.webp",
            ].map((path) => (
              <DynamicImage
                src={path}
                alt={"other.dice"}
                className={guideStyles.dice}
              />
            ))}
            components={{ strong: <strong /> }}
          />
        </ul>
      </section>
      <section>
        <h2 className={guideStyles.subTitle}>{t(`${tPath(3)}.title`)}</h2>
        <ul className={guideStyles.list}>
          <TransListItems baseTPath={`${tPath(3)}.ul1`} liAmount={2} />
        </ul>
        <ul className={guideStyles.list}>
          <TransListItems
            baseTPath={`${tPath(3)}.ul2`}
            img={[
              "/UI/weather/tokens/rain.webp",
              "/UI/weather/tokens/snow.webp",
              "/UI/weather/tokens/storm.webp",
            ]}
            components={{ Icon: <Icon />, strong: <strong /> }}
          />
        </ul>
      </section>

      <section>
        <h2 className={guideStyles.subTitle}>{t(`${tPath(4)}.title`)}</h2>
        <p className={guideStyles.p}>${`${tPath(4)}.paragraph1`}</p>
        <ul className={guideStyles.list}>
          <TransListItems
            baseTPath={`${tPath(4)}.ul1`}
            components={{ strong: <strong /> }}
            img={["/UI/weather/rain-cloud.webp", "/UI/weather/snow-cloud.webp"]}
          />
        </ul>
      </section>
      <section>
        <h2 className={guideStyles.subTitle}>{t(tPath(5, "title"))}</h2>
        <ul className={guideStyles.list}>
          <TransListItems
            baseTPath={`${tPath(5, "ul1")}`}
            liAmount={5}
            components={{ Icon: <Icon />, strong: <strong /> }}
          />
        </ul>
      </section>
      <section>
        <h2 className={guideStyles.subTitle}>{t(tPath(6, "title"))}</h2>
        <p className={guideStyles.p}>{t(tPath(6, "paragraph1"))}</p>
        <ul className={guideStyles.list}>
          <TransListItems
            baseTPath={tPath(6, "ul1")}
            img={[
              "/UI/dice/weather/animals/beast.webp",
              "/UI/dice/weather/animals/palisade.webp",
              "/UI/dice/weather/animals/food.webp",
            ].map((path) => (
              <DynamicImage
                src={path}
                alt={t("other.dice")}
                className={guideStyles.dice}
              />
            ))}
            components={{ Icon: <Icon />, strong: <strong /> }}
          />
        </ul>
      </section>
    </>
  );
}
