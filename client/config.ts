const dev = process.env.NODE_ENV !== "production";

const config = {
    SERVER_URL: dev ? "localhost:3030" : "https://board-game-gnyu.onrender.com"
}

export default config;
