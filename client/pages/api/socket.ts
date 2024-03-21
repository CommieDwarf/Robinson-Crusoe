import {io} from "socket.io-client"

export default function createSocketClient() {
    return io(`http://localhost:3030`, {
        autoConnect: false
    })
}
