import styles from "./Castaways.module.css";
import Image from "next/image";
import { RoundSquare } from "./RoundSquare";
import { ScenarioInfo } from "./ScenarioInfo/ScenarioInfo";
import { WoodStack } from "./WoodStack/WoodStack";

const rainDays = [5, 6, 7, 8, 9, 10, 11, 12];
const hungryAnimalDays = [7, 8, 9, 10, 11, 12];
const snowDays = hungryAnimalDays;

const currentRound = 2;

const scenarioDescription = `Jesteście rozbitkami na bezludnej wyspie.
 Jest koniec lata, musicie przygotować się na nadejście zimy
  — zbudować schronienie, dach, palisadę. Ciężko będzie przetrwać 
  nadchodzące ciężkie miesiące jesieni i zimy. Potrzebny będzie też
   stos drewna, który będzie można podpalić i liczyć, że jakiś statek 
   przepływający na horyzoncie was dostrzeże.`;

const scenarioObjective = `Aby wygrać, gracze muszą wytworzyć przedmiot Ogień oraz
 zbudować stos drewna przedstawiony na karcie scenariusza. Jeśli w 10.,
 11. czy 12. rundzie warunki te są spełnione, to gracze wygrywają.`;

const stashBuild = `Stos ma się składać z 15 znaczników drewna.
 Drewno na stos gracze mogą odkładać przed fazą Akcji. W jednej rundzie można
  odłożyć na stos dowolną ilość drewna, ale ukończyć nie więcej niż 1 etap budowy stosu. 
  (za pierwszym razem 1 znacznik drewna, następnie max. 2 znaczniki itd.), 
  Drewno odłożone na stos nie może być z niego zabrane.`;

export default function Castaways() {
  let rounds = [];

  for (let i = 1; i <= 12; i++) {
    const ship = i >= 10;
    const weather = {
      rain: rainDays.includes(i),
      snow: snowDays.includes(i),
      hungryAnimal: hungryAnimalDays.includes(i),
    };
    const current = i === currentRound;
    rounds.push(
      <RoundSquare
        round={i}
        ship={ship}
        weather={weather}
        currentRound={current}
      />
    );
  }

  const scenarioInfo = new Map();
  scenarioInfo.set("description", scenarioDescription);
  scenarioInfo.set("objective", scenarioObjective);
  scenarioInfo.set("woodStash", stashBuild);

  return (
    <div className={styles.container}>
      <div className={styles.titleDiv}>
        <span className={styles.title}>Rozbitkowie</span>
        <Image
          src="/interface/scenarios/title.png"
          className={styles.titleImage}
          layout={"fill"}
          alt="tytuł tło"
        />
      </div>
      <div className={styles.rounds}>{rounds}</div>
      <ScenarioInfo info={scenarioInfo} />
      <WoodStack />
    </div>
  );
}
