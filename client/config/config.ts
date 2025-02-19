const dev = process.env.NODE_ENV !== "production";

const config = {
	SERVER_URL: getServerUrl(),
};

export default config;

function getServerUrl(): string {
	const url = dev
		? process.env.NEXT_PUBLIC_DEV_SERVER_URL
		: process.env.NEXT_PUBLIC_PROD_SERVER_URL;

	if (!url) {
		if (dev) {
			throw new Error(
				"DEV_SERVER_URL is not defined in development mode"
			);
		} else {
			throw new Error(
				"PROD_SERVER_URL is not defined in production mode"
			);
		}
	}

	return url;
}
