import { pl } from "../I18n/resources/pl";
import { ABILITY } from "@shared/types/Game/Skill/ABILITY";
import i18n from "../I18n/I18n";
import { useTranslation } from "react-i18next";

export function dynamicTranslate(text: string) {
  const { t } = useTranslation();
  const categories = Object.keys(pl.translation);
  let translated;
  categories.forEach((category) => {
    if (i18n.exists(`${category}.${text}`)) {
      if (Object.values(ABILITY).includes(text as ABILITY)) {
        // @ts-expect-error
        translated = t(`ability.${text}.name`);
      } else {
        // @ts-expect-error
        translated = t(`${category}.${text}`);
      }
    }
  });
  if (!translated) {
    return text;
  }
  return translated;
}
