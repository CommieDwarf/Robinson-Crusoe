import styles from "./CustomToolTip.module.css";
import { CustomStep } from "../steps/steps";
import { Trans, useTranslation } from "react-i18next";
import { StepMerged, TooltipRenderProps } from "react-joyride/src";
import {
  Icon,
  insertIconsIntoText,
} from "../../../../utils/insertIconsIntoText/insertIconsIntoText";
import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from "react";
import { UI_TOUR_STEP_ID } from "../../../../types/UITour/UI_TOUR_STEP_ID";
import { TFunction } from "i18next";
import capitalize from "@shared/utils/capitalize";

interface CustomProps {
  onNextClick?: () => void;
  step: StepMerged & CustomStep;
}

type Props = TooltipRenderProps & CustomProps;

const strong = <strong />;
const em = <em />;
const li = <li />;
const ul = <ul />;

const components = {
  strong: strong,
  em: em,
  li,
  ul,
  Icon: <Icon />,
  span: <span />,
};

export function CustomTooltip(props: Props) {
  const { closeProps, continuous, primaryProps, step, tooltipProps } = props;

  const { t, i18n } = useTranslation();

  const content = (
    <Trans
      i18nKey={`UITour.steps.${step.data.id}.content`}
      components={components}
      t={t}
      values={{}}
    />
  );

  return (
    <div
      className={`${styles.body}`}
      {...tooltipProps}
      style={props.step.data.toolTipStyle}
    >
      <div className={styles.topBar}>
        {i18n.exists(`UITour.steps.${step.data.id}.title`) && (
          <h4 className={`${styles.title}`}>
            {capitalize(t(`UITour.steps.${step.data.id}.title`))}
          </h4>
        )}
      </div>
      <div className={`${styles.content}`}>{content}</div>
      <div className={`${styles.footer}`}>
        {
          <div className={`${styles.toolTipButton}`} {...closeProps}>
            {capitalize(t("other.close"))}
          </div>
        }
        {!step.data?.hideNextButton && continuous && (
          <div
            className={`${styles.toolTipButton}`}
            {...primaryProps}
            onClick={props.onNextClick}
          >
            {capitalize(t("other.next"))}
          </div>
        )}
      </div>
    </div>
  );
}
