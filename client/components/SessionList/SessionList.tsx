import styles from "./SessionList.module.css";
import {Session} from "./Session/Session";
import {Header} from "./Header/Header";


// max 25 znakow dla nazwy
export function SessionList() {
    return <div className={styles.container}>
        <Header/>
        <div className={styles.sessionList}>
            <Session
                name={"Lubie grać w minecrafta"}
                playerAmount={2}
                maxPlayerAmount={4}
                scenario={"castaways"}
                host={"AnalnyDewastator"}
                password={true}
            />
            <Session
                name={"AAAAAAAAAAAAAAAAAAAAAAAAA"}
                playerAmount={2}
                maxPlayerAmount={4}
                scenario={"castaways"}
                host={"AAAAAAAAAAAAAAAA"}
                password={true}
            />
            <Session
                name={"Iksde"}
                playerAmount={1}
                maxPlayerAmount={2}
                scenario={"castaways"}
                host={"NiemyMichałek76"}
                password={false}
            />
            <Session
                name={"A kto by go przenosił, taki ciężki"}
                playerAmount={4}
                maxPlayerAmount={4}
                scenario={"castaways"}
                host={"Papiesz"}
                password={false}
            />
            <Session
                name={"FxD"}
                playerAmount={3}
                maxPlayerAmount={3}
                scenario={"castaways"}
                host={"okrutnik"}
                password={true}
            />
            <Session
                name={"wbijaj damian"}
                playerAmount={1}
                maxPlayerAmount={4}
                scenario={"castaways"}
                host={"3$@#CO"}
                password={true}
            />
        </div>
    </div>
}
