import {io} from "socket.io-client"

const PORT = 3030;
export default function socketClient() {
    const socket = io(`http://localhost:3030`)

    socket.on("connect", () => {
        console.log("Connected")
        socket.emit("game_instance_requested");
    })

    socket.on("disconnect", () => {
        console.log("Disconnected")
        socket.off();
    })

    socket.on("connect_error", async err => {
        // console.log(`connect_error due to ${err.message}`)
        await fetch("/api/socket")
    })

    return socket
}

