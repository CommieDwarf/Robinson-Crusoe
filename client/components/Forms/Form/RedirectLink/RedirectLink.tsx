import { capitalize } from "lodash";
import styles from "./RedirectLink.module.css";
import Link from "next/link";


interface Props {
    label?: string;
    linkText: string;
    href: string;
	fontSize?: string;
}



export function RedirectLink(props: Props) {
	return (
		<span className={styles.container} style={{fontSize: props.fontSize}}>
			{props.label && <p className={styles.label}>
                {props.label}
			</p>}
			<Link href={props.href} className={styles.link}>
				{props.linkText}
			</Link>
		</span>
	);
}
