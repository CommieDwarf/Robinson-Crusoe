import { Trans, useTranslation } from "react-i18next";
import React from "react";
import { ImgListItem } from "../ImgList.tsx/ImgListItem";
import { TFunction } from "i18next";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { StaticImageData } from "next/image";
import { isStaticImageData } from "../../../../../utils/typeguards/isStaticImgData";

interface BaseProps {
  baseTPath: string;
  components?:
    | readonly React.ReactElement[]
    | {
        [p: string]: React.ReactElement;
      };
  liClass?: string;
}

interface PropsWithImg extends BaseProps {
  img: string[] | StaticImageData[] | JSX.Element[];
  liAmount?: number;
}

interface PropsWithNum extends BaseProps {
  liAmount: number;
  img?: string[] | StaticImageData[] | JSX.Element[];
}

type Props = PropsWithImg | PropsWithNum;

export function TransListItems(props: Props) {
  const { t } = useTranslation();

  const elements = [];

  const numOfLiElements = props.liAmount ? props.liAmount : props.img!.length;
  const img = props.img;
  for (let i = 1; i <= numOfLiElements; i++) {
    const i18key = `${props.baseTPath}.li${i}`;
    const liInfo = {
      i18key,
      liClass: props.liClass,
      components: props.components,
    };
    elements.push(
      img
        ? createImgLi({ ...liInfo, img: img[i - 1] }, t)
        : createLi({ ...liInfo }, t),
    );
  }
  return <> {elements} </>;
}

interface LiInfo {
  i18key: string;
  liClass?: string;
  components?:
    | readonly React.ReactElement[]
    | {
        [p: string]: React.ReactElement;
      };
}

function createLi(liInfo: LiInfo, t: TFunction) {
  return (
    <li className={liInfo.liClass}>
      {/*@ts-ignore*/}
      <Trans components={liInfo.components} t={t} i18nKey={liInfo.i18key} />
    </li>
  );
}

interface ImgLiInfo extends LiInfo {
  img: string | StaticImageData | JSX.Element;
}

function createImgLi(imgLiInfo: ImgLiInfo, t: TFunction) {
  const img =
    isStaticImageData(imgLiInfo.img) || typeof imgLiInfo.img === "string" ? (
      <DynamicImage src={imgLiInfo.img} alt={"icon"} />
    ) : (
      imgLiInfo.img
    );

  return (
    <ImgListItem
      textElement={() => {
        return (
          <Trans
            components={imgLiInfo.components}
            t={t}
            i18nKey={imgLiInfo.i18key}
          />
        );
      }}
      imgElement={() => img}
    />
  );
}
