import styles from "./PickObject.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {PickableObject, PickableRenderData, PickSubject} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {kebabCase} from "lodash";
import {IInventionRenderData} from "@shared/types/Game/InventionService/Invention";

interface Props {
    pickSubject: PickSubject,
    pickObject: PickableRenderData<PickableObject>,
    selectObject: (id: string) => void;
    selected: boolean;
    selectable: boolean;
}

export function PickObject(props: Props) {
    const basePath = "/UI";
    let imgUrlPath = "";
    let name = "name" in props.pickObject.object ? kebabCase(props.pickObject.object.name) : props.pickObject.object.id;

    switch (true) {
        case props.pickSubject === "beast":
            imgUrlPath = `${basePath}/cards/beasts/${name}.png`;
            break;
        case props.pickSubject === "item":
            imgUrlPath = `${basePath}/cards/items/${name}.png`;
            break;
        case props.pickSubject === "invention":
            const invention = props.pickObject.object as IInventionRenderData;
            imgUrlPath = `${basePath}/inventions/${invention.inventionType}/${name}.png`;
            break;
        case props.pickSubject === "token":
            imgUrlPath = `${basePath}/tokens/discovery/${name}.png`;
            break;
        case props.pickSubject === "tileType":
            imgUrlPath = `${basePath}/map/tiles/${name}.png`;
            break;
        case props.pickSubject === "construction":
            imgUrlPath = `${basePath}/constructions/${name}-icon.png`;
            break;
    }


    function handleClick() {
        if (!props.selectable) {
            return;
        }
        props.selectObject(props.pickObject.id)
    }

    const aspectRatio = props.pickSubject === "token" || props.pickSubject === "tileType" ? "square" : "card";


    return <div
        className={`
            ${styles.container}
            ${props.selectable && styles.containerSelectable}
            ${props.selected && styles.containerSelected}
            ${styles[props.pickSubject]}
            ${aspectRatio === "card" && styles.card}
             `}
        onClick={handleClick}
    >
        <ResizableImage src={imgUrlPath} alt={String(name)} fill/>
    </div>
}
