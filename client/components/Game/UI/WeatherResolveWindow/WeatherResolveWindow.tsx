import * as React from "react";
import { useState } from "react";
import styles from "./WeatherResolveWindow.module.css";
import { Header } from "./Header/Header";
import { WeatherTokens } from "./BottomBar/Tokens/WeatherTokens";
import { Resources } from "./BottomBar/Resources/Resources";
import { CloudsTotal } from "./BottomBar/CloudsTotal/CloudsTotal";
import { Dices } from "./Dices/Dices";
import { RollDiceButton } from "./RollDiceButton/RollDiceButton";
import { RollDiceWindow } from "./RollDiceWindow/RollDiceWindow";
import { useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";

type Props = {};
export const WeatherResolveWindow = (props: Props) => {
	const weatherDices = useAppSelector(
		(state) => selectGame(state)?.scenarioService.weather
	);
	const currentRound = useAppSelector((state) => selectGame(state)?.round);
	const weatherService = useAppSelector(
		(state) => selectGame(state)?.weatherService
	);

	const [resolved, setResolved] = useState(
		!!(
			weatherDices &&
			currentRound &&
			!weatherDices.animals.includes(currentRound) &&
			!weatherDices.rain.includes(currentRound) &&
			!weatherDices.winter.includes(currentRound)
		)
	);

	function setWeatherResolved() {
		setResolved(true);
	}

	if (!weatherDices || !currentRound || !weatherService) return null;
	return (
		<div className={styles.container}>
			<RollDiceWindow
				weatherService={weatherService}
				setResolved={setWeatherResolved}
				resolved={resolved}
			/>

			<Header round={currentRound} resolved={resolved} />
			<Dices
				animals={weatherDices.animals.includes(currentRound)}
				rain={weatherDices.rain.includes(currentRound)}
				snow={weatherDices.winter.includes(currentRound)}
			/>
			{weatherService.shouldRollDices && <RollDiceButton />}
			<div className={styles.bottomBar}>
				<WeatherTokens tokens={weatherService.tokens} />
				<CloudsTotal
					weatherService={weatherService}
					resolved={resolved}
				/>
				<Resources
					overallWeather={weatherService.overallWeather}
					storm={weatherService.tokens.storm}
					resolved={resolved}
				/>
			</div>
		</div>
	);
};
