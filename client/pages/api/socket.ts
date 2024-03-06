import {io} from "socket.io-client"

const PORT = 3030;
export default function socketClient() {
    const socket = io(`localhost:${PORT}`)

    socket.on("connect", () => {
        console.log("Connected")
    })

    socket.on("disconnect", () => {
        console.log("Disconnected")
    })

    socket.on("connect_error", async err => {
        console.log(`connect_error due to ${err.message}`)
        await fetch("/api/socket")
    })

    return socket
}

