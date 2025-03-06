export const sharedConfig = {
	limits: {
		usernameMaxLength: 16,
		usernameMinLength: 6,
		passwordMaxLength: 16,
		passwordMinLength: 8,
		resetPasswordCodeLength: 6,
	},
	session: {
		maxPlayers: 4,
		minPlayers: 1,
		invitationCodeLength: 6,
		passwordMinLength: 0,
		passwordMaxLength: 16,
		nameMinLength: 3,
		nameMaxLength: 33,
		maxStartingEquipment: 4,
		minStartingEqipment: 0,
	},
};
