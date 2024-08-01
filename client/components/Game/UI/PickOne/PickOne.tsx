import Draggable from "react-draggable";
import {PickObject} from "./PickObject/PickObject";
import styles from "./PickOne.module.css";
import {IObjectPickerRenderData,} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";
import {insertIconsIntoText} from "../../../../utils/insertIconsIntoText";
import {useAppDispatch} from "../../../../store/hooks";
import {socketEmitAction} from "../../../../middleware/socketMiddleware";
import {useDynamicTranslation} from "../../../../utils/hooks/useDynamicTranslation";
import {ABILITY} from "@shared/types/Game/Skill/ABILITY";

interface Props {
    objectPicker: IObjectPickerRenderData<any>;
}

export function PickOne(props: Props) {
    const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
    const {amount, objects, source, pickSubject, hasSecondEffect} = props.objectPicker;

    const dispatch = useAppDispatch();

    function selectObject(id: string) {
        if (selectedObjectIds.length >= amount) {
            setSelectedObjectIds((prev) => [...prev.slice(0, -2), id])
        } else {
            setSelectedObjectIds((prev) => [...prev, id])
        }
    }


    function handleConfirmClick() {
        pickObject(false);
    }

    function pickObject(isSecondary: boolean) {
        if (selectedObjectIds.length === amount) {
            dispatch(socketEmitAction(OTHER_CONTROLLER_ACTION.PICK_OBJECT, props.objectPicker.id, selectedObjectIds, isSecondary));
        }
    }

    function handleSecondaryClick() {
        pickObject(true);
    }


    const {t} = useTranslation();


    return (
        <Draggable bounds={"parent"}>
            <div className={styles.container}>
                <span className={styles.source}>
                    <h1>
                        {/*@ts-ignore*/}
                        {useDynamicTranslation(props.objectPicker.source)}
                    </h1>
                </span>
                {Object.values(ABILITY).includes(props.objectPicker.source as ABILITY) &&
                    <div className={styles.descriptionWrapper}>
                        <span className={styles.description}>
                        {/*@ts-ignore*/}
                            {insertIconsIntoText(t(`ability.${props.objectPicker.source}.description`), styles.icon)}
                      </span>
                    </div>

                }

                {props.objectPicker.pickSubject !== "construction" && <div className={styles.pickObjects}>
                    {objects.map((obj, index) => {
                        return <PickObject
                            pickSubject={pickSubject}
                            pickObject={obj} key={index}
                            selectObject={selectObject}
                            selected={selectedObjectIds.includes(obj.id)}
                            selectable={amount !== 0}
                        />
                    })}
                </div>}
                <div className={styles.buttons}>
                    <div className={`${styles.button} ${styles.buttonConfirm}`}
                         onClick={handleConfirmClick}>
                        {/* @ts-ignore*/}
                        {insertIconsIntoText(capitalize(t(`pickObject.${source}.effectLabel`, {defaultValue: t(`other.confirm`)})), styles.icon)}

                    </div>
                    {hasSecondEffect && <div className={`${styles.button} ${styles.buttonConfirm}`}
                                             onClick={handleSecondaryClick}>
                        {/*@ts-ignore*/}
                        {insertIconsIntoText(capitalize(t(`pickObject.${source}.secondaryEffectLabel`)), styles.icon)}
                    </div>}
                </div>
            </div>
        </Draggable>
    )
}
