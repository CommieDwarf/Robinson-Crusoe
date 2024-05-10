import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";

interface Props {
    message: string;
}

export function Error(props: Props) {
    const {t} = useTranslation();

    return <div><h4>{capitalize(t("menu.error"))}</h4>
        <hr/>
        {/*@ts-ignore*/}
        <span>{capitalize(t(`error.${props.message}`))}</span>

    </div>
}
