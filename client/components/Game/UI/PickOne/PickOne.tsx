import Draggable from "react-draggable";
import {PickObject} from "./PickingObject/PickObject";
import styles from "./PickOne.module.css";
import {IObjectPickerRenderData,} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {capitalize} from "lodash";
import {socketEmitter} from "../../../../pages/_app";
import {OTHER_CONTROLLER_ACTION} from "@shared/types/CONTROLLER_ACTION";

interface Props {
    objectPicker: IObjectPickerRenderData<any>;
}

export function PickOne(props: Props) {
    const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
    const {picker, amount, objects, source, pickSubject} = props.objectPicker;


    function selectObject(id: string) {
        if (selectedObjectIds.length >= amount) {
            setSelectedObjectIds((prev) => [...prev.slice(0, -2), id])
        } else {
            setSelectedObjectIds((prev) => [...prev, id])
        }

    }

    function unselectObject(id: string) {
        setSelectedObjectIds((prev) => prev.filter((i) => i !== id));
    }

    function handleConfirmClick() {
        if (selectedObjectIds.length === amount) {
            socketEmitter.emitAction(OTHER_CONTROLLER_ACTION.PICK_OBJECT, props.objectPicker.id, selectedObjectIds);
        }
    }


    const {t} = useTranslation();


    return (
        <Draggable bounds={"parent"}>
            <div className={styles.container}>
                <span className={styles.source}>
                    <h1>
                        {/*@ts-ignore*/}
                        {t(`pickObject.${source}.source`)}
                    </h1>
                </span>
                <span className={styles.description}>
                    {/*@ts-ignore*/}
                    {t(`pickObject.${source}.description`)}
                </span>

                <div className={styles.pickObjects}>
                    {objects.map((obj, index) => {
                        return <PickObject
                            pickSubject={pickSubject}
                            pickObject={obj} key={index}
                            selectObject={selectObject}
                            selected={selectedObjectIds.includes(obj.id)}
                        />
                    })}
                </div>
                <div className={styles.buttons}>
                    <div className={`${styles.button} ${styles.buttonConfirm}`}
                         onClick={handleConfirmClick}>{capitalize(t("other.confirm"))}</div>
                    <div className={`${styles.button} ${styles.buttonCancel}`}>{capitalize(t("other.cancel"))}</div>
                </div>
            </div>
        </Draggable>
    )
}
