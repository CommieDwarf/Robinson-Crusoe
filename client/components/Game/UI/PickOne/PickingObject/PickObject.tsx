import {isInventionRenderData} from "@shared/utils/typeGuards/isInventionRenderData";
import styles from "./PickObject.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import {PickableObject, PickableRenderData, PickSubject} from "@shared/types/Game/ObjectPicker/ObjectPicker";
import {kebabCase} from "lodash";

interface Props {
    pickSubject: PickSubject,
    pickObject: PickableRenderData<PickableObject>,
    selectObject: (id: string) => void;
    selected: boolean;
}

export function PickObject(props: Props) {
    const basePath = "/UI";
    let imgUrlPath = ""
    let name = "name" in props.pickObject.object ? kebabCase(props.pickObject.object.name) : props.pickObject.object.id;

    switch (true) {
        case props.pickSubject === "beast":
            imgUrlPath = `${basePath}/cards/beasts/${name}.png`;
            break;
        case props.pickSubject === "item":
            imgUrlPath = `${basePath}/cards/items/${name}.png`;
            break;
        case isInventionRenderData(props.pickObject):
            imgUrlPath = `${basePath}/inventions/${props.pickObject.inventionType}/${name}.png`;
            break;
        case props.pickSubject === "token":
            imgUrlPath = `${basePath}/tokens/discovery/${name}.png`;
            break;
        default:
            imgUrlPath = `${basePath}/map/tiles/${name}.png`;
            break;
    }


    function handleClick() {
        props.selectObject(props.pickObject.id)
    }

    return <div className={`${styles.container} ${props.selected && styles.containerSelected}`} onClick={handleClick}
    >
        <ResizableImage src={imgUrlPath} alt={"dd"} fill/>
    </div>
}
