import { GUIDE_CONTENT } from "../Contents";
import styles from "./ListItem.module.css";
import { capitalizeAll } from "@shared/utils/capitalizeAll";
import { useTranslation } from "react-i18next";

interface Props {
  selected: boolean;
  content: GUIDE_CONTENT;
  onClick: (content: GUIDE_CONTENT) => void;
}

export function ListItem(props: Props) {
  function handleClick() {
    props.onClick(props.content);
  }

  const { t } = useTranslation();

  return (
    <li className={styles.container} onClick={handleClick}>
      <span
        className={`${styles.content} ${props.selected && styles.selected}`}
      >
        {/* {props.content} */}
        {capitalizeAll(t(`guide.contents.${props.content}`))}
      </span>
    </li>
  );
}
