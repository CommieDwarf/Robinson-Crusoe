const dev = process.env.NODE_ENV !== "production";

const config = {
    SERVER_URL: dev ? "http://localhost:3030" : "https://board-game-gnyu.onrender.com"
}

console.log("config", config);

export default config;
