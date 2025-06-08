import styles from "../../Guide.module.css";
import { useTranslation } from "react-i18next";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import { StaticImageData } from "next/image";
import { isStaticImageData } from "../../../../../../utils/typeguards/isStaticImgData";

interface Props {
  title: string;
  img?: string | StaticImageData | JSX.Element;
}

export function Header(props: Props) {
  const { t } = useTranslation();

  const img =
    props.img &&
    (typeof props.img === "string" || isStaticImageData(props.img) ? (
      <DynamicImage src={props.img} alt="action" />
    ) : (
      props.img
    ));

  return (
    <div className={styles.flexBlock}>
      {img && <div className={styles.titleImg}>{img}</div>}

      <h2 className={styles.title}>{props.title}</h2>

      {img && <div className={styles.titleImg}>{img}</div>}
    </div>
  );
}
