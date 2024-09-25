import styles from "./Contents.module.css";
import { ListItem } from "./ListItem/ListItem";


interface Props {
    onContentClick: (content: GUIDE_CONTENT) => void;
    selected: GUIDE_CONTENT;
}


export function Contents(props: Props) {



	return (
		<ol className={styles.container} type={"I"}>
			{contents.map((content) => {
				if (typeof content === "string") {
					return <ListItem content={content} onClick={props.onContentClick} selected={content === props.selected}/>;
				} else {
					return (
						<ol className={styles.innerList}>
							{content.map((con) => {
								return <ListItem content={con} onClick={props.onContentClick} selected={con === props.selected}/>;
							})}
						</ol>
					);
				}
			})}
			
		</ol>
	);
}

export enum GUIDE_CONTENT {
    INTRODUCTION = "introduction",
    EVENT_PHASE = "event phase",
    MORALE_PHASE = "morale phase",
    ACTION_PHASE_PLANNING = "action phase planning",
    THREAT_ACTION = "threat action",
    HUNT_ACTION = "hunt action",
    BUILD_ACTION = "build action",
    GATHER_ACTION = "gather action",
    EXPLORATION_ACTION = "exploration action",
    ARRANGE_CAMP_ACTION = "arrange camp action",
    REST_ACTION = "rest action",
    ACTION_PHASE_RESOLVE = "action phase resolve",
    WEATHER = "weather",
    NIGHT =  "night",
}


const contents: (GUIDE_CONTENT[] | GUIDE_CONTENT)[] = [
GUIDE_CONTENT.INTRODUCTION,
GUIDE_CONTENT.EVENT_PHASE,
    GUIDE_CONTENT.MORALE_PHASE,
    GUIDE_CONTENT.ACTION_PHASE_PLANNING,
    [GUIDE_CONTENT.THREAT_ACTION,
        GUIDE_CONTENT.HUNT_ACTION,
        GUIDE_CONTENT.BUILD_ACTION,
        GUIDE_CONTENT.GATHER_ACTION,
        GUIDE_CONTENT.EXPLORATION_ACTION,
        GUIDE_CONTENT.ARRANGE_CAMP_ACTION,
        GUIDE_CONTENT.REST_ACTION
    ],
    GUIDE_CONTENT.ACTION_PHASE_RESOLVE,
    GUIDE_CONTENT.WEATHER,
    GUIDE_CONTENT.NIGHT,
];
