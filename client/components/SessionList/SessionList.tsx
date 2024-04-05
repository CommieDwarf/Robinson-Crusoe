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
                host={"Maciek"}
                password={true}
            />
            <Session
                name={"Lubie grać w minecrafta"}
                playerAmount={2}
                maxPlayerAmount={4}
                scenario={"castaways"}
                host={"Maciek"}
                password={true}
            /> <Session
            name={"Lubie grać w minecrafta"}
            playerAmount={2}
            maxPlayerAmount={4}
            scenario={"castaways"}
            host={"Maciek"}
            password={true}
        /> <Session
            name={"Lubie grać w minecrafta"}
            playerAmount={2}
            maxPlayerAmount={4}
            scenario={"castaways"}
            host={"Maciek"}
            password={true}
        /> <Session
            name={"Lubie grać w minecrafta"}
            playerAmount={2}
            maxPlayerAmount={4}
            scenario={"castaways"}
            host={"Maciek"}
            password={true}
        />
        </div>
    </div>
}
