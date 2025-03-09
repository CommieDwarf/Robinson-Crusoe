import DynamicImage from "components/DynamicImage/DynamicImage";
import styles from "./index.module.css";
import shipImage from "public/UI/404.webp"
import { RedirectLink } from "components/Forms/Form/RedirectLink/RedirectLink";

export default function Custom404() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Nie znaleziono strony</h1>
			<div className={styles.shipImg}>
				<DynamicImage src={shipImage} alt="404"/>
			</div>
			<div className={styles.backLink}>
				<RedirectLink linkText={"Powrót do strony głównej"} href={"/"}/>
			</div>

		</div>
	);
}
