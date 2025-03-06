import {
	Side,
	TileResourceInfoRenderData,
} from "@shared/types/Game/TileService/TileResourceService";
import { ResourceActionButton } from "./ResourceActionButton/ResourceActionButton";
import { Shortcut } from "./Shortcut/Shortcut";
import { ResourceModifier } from "./ResourceModifier/ResourceModifier";
import { ResourceDepleted } from "./ResourceDepleted/ResourceDepleted";

interface Props {
	resourceInfo: TileResourceInfoRenderData;
	side: Side;
	tileId: number;
}

export function ResourceModifiers(props: Props) {
	return (
		<>
			{props.resourceInfo.markedForAction && (
				<ResourceActionButton side={props.side} tileID={props.tileId} />
			)}
			{props.resourceInfo.shortcut && <Shortcut side={props.side} />}
			{props.resourceInfo.modifiers.length > 0 && (
				<ResourceModifier
					side={props.side}
					resource={props.resourceInfo.resource}
				/>
			)}
			{props.resourceInfo.depleted && (
				<ResourceDepleted side={props.side} />
			)}
		</>
	);
}
