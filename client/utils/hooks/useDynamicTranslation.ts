import {resources} from "../../I18n/resources";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";
import i18n from "../../I18n/I18n";
import {useTranslation} from "react-i18next";

export function useDynamicTranslation(text: string) {

    const {t} = useTranslation();
    const categories = Object.keys(resources.pl.translation);
    let translated;
    categories.forEach((category) => {
        if (i18n.exists(`${category}.${text}`)) {
            if (Object.values(ABILITY).includes(text as ABILITY)) {
                // @ts-ignore
                translated = t(`ability.${text}.name`)
            } else {
                // @ts-ignore
                translated = t(`${category}.${text}`)
            }
        }
    })
    if (!translated) {
        return text;
    }
    return translated;
}
