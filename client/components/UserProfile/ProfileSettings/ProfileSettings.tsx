import { PROFILE_NAV, ProfileComponentProps } from "../UserProfile";
import profileStyles from "../UserProfile.module.css";
import { DropdownMenu } from "./DropdownMenu/DropdownMenu";
import { NewPasswordForm } from "./NewPasswordForm/NewPasswordForm";
import { useTranslation } from "react-i18next";

export function ProfileSettings(props: ProfileComponentProps) {
	const { t } = useTranslation();

	function handleLinkClick() {
		props.changeNav(PROFILE_NAV.HOME);
	}

	return (
		<>
			<h2>{t("userProfile.accountSettings")}</h2>
			<hr />
			<DropdownMenu buttonLabel={t("userProfile.passwordChange")}>
				<NewPasswordForm />
			</DropdownMenu>

			<hr />
			<span className={profileStyles.link} onClick={handleLinkClick}>
				{t("userProfile.backToProfile")}
			</span>
		</>
	);
}
