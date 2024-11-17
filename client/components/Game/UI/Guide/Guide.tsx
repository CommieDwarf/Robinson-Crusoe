import { useState } from "react";
import { insertIconsIntoText } from "../../../../utils/insertIconsIntoText/insertIconsIntoText";
import { Contents, GUIDE_CONTENT } from "./Contents/Contents";
import styles from "./Guide.module.css";
import { ArrangeCampPage } from "./pages/Action/ArrangeCampPage";
import { BuildPage } from "./pages/Action/BuildPage";
import { ExplorePage } from "./pages/Action/ExplorePage";
import { GatherPage } from "./pages/Action/GatherPage";
import { HuntPage } from "./pages/Action/HuntPage";
import { RestPage } from "./pages/Action/RestPage";
import { ThreatPage } from "./pages/Action/ThreatPage";
import { ActionPage } from "./pages/ActionPage";
import { EventPage } from "./pages/EventPage";
import { IntroductionPage } from "./pages/IntroductionPage";
import { MoralePage } from "./pages/MoralePage";
import { ActionResolvePage } from "./pages/ActionResolve/ActionResolvePage";
import { WeatherPage } from "./pages/Weather/WeatherPage";
import { NightPage } from "./pages/NightPage";





export function Guide() {

	const [selected, setSelected] = useState(GUIDE_CONTENT.INTRODUCTION);

	const SelectedComponent = contentComponentMap[selected];

	function select(content: GUIDE_CONTENT) {
		setSelected(content);
	}



	return (
		<div className={styles.container}>
			<div className={styles.contents}>
				<Contents onContentClick={select} selected={selected}/>
			</div>
			<div className={styles.page}>
			{<SelectedComponent/>}

			</div>
		</div>
	);
}


export function insertIcon(icon: string) {
	return insertIconsIntoText(icon, styles.icon);
}


const contentComponentMap = {
	[GUIDE_CONTENT.INTRODUCTION]: IntroductionPage,
	[GUIDE_CONTENT.EVENT_PHASE]: EventPage,
	[GUIDE_CONTENT.MORALE_PHASE]: MoralePage,
	[GUIDE_CONTENT.ACTION_PHASE_PLANNING]: ActionPage,
	[GUIDE_CONTENT.THREAT_ACTION]: ThreatPage,
	[GUIDE_CONTENT.HUNT_ACTION]: HuntPage,
	[GUIDE_CONTENT.BUILD_ACTION]: BuildPage,
	[GUIDE_CONTENT.GATHER_ACTION]: GatherPage,
	[GUIDE_CONTENT.EXPLORATION_ACTION]: ExplorePage,
	[GUIDE_CONTENT.ARRANGE_CAMP_ACTION]: ArrangeCampPage,
	[GUIDE_CONTENT.REST_ACTION]: RestPage,
	[GUIDE_CONTENT.ACTION_PHASE_RESOLVE]: ActionResolvePage,
	[GUIDE_CONTENT.WEATHER]: WeatherPage,
	[GUIDE_CONTENT.NIGHT]: NightPage,
}