import styles from "./ToggleSwitch.module.css";
import { CSSProperties, useEffect, useState } from "react";

interface Props {
  onToggle?: () => void;
  onOff?: () => void;
  onOn?: () => void;
  knobOffStyle?: CSSProperties;
  sliderOffStyle?: CSSProperties;
  knobOnStyle?: CSSProperties;
  sliderOnStyle?: CSSProperties;
  knobOffClass?: string;
  sliderOffClass?: string;
  knobOnClass?: string;
  sliderOnClass?: string;
}

export function ToggleSwitch(props: Props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.onToggle) {
      props.onToggle();
    }
    if (checked && props.onOn) {
      props.onOn();
    } else if (!checked && props.onOff) {
      props.onOff();
    }
  }, [checked]);

  function handleChange() {
    setChecked((prev) => !prev);
  }

  const sliderStyle = checked ? props.sliderOnStyle : props.sliderOffStyle;
  const knobStyle = checked ? props.knobOnStyle : props.knobOffStyle;

  const sliderClass = checked ? props.sliderOnClass : props.sliderOffClass;
  const knobClass = checked ? props.knobOnClass : props.knobOffClass;

  const defaultSliderClass = checked
    ? styles.sliderChecked
    : styles.sliderUnchecked;

  return (
    <label className={`${styles.container}`}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <div
        className={`${styles.slider} ${sliderClass || defaultSliderClass}`}
        style={sliderStyle}
      >
        <div
          className={`${styles.knob} ${knobClass || styles.knobDefault}`}
          style={knobStyle}
        ></div>
      </div>
    </label>
  );
}
