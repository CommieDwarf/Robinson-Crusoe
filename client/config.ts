const dev = process.env.NODE_ENV !== "production";

const config = {
    SERVER_URL: dev ? process.env.DEV_SERVER_URL  || "dev server url" : process.env.PROD_SERVER_URL || "prod server url"
}


export default config;
