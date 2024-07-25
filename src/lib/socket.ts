// socket.js
import { io } from "socket.io-client"

//const SOCKET_URL = "http://localhost:5700"
const SOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT || "https://whatsapp.raphauy.dev"
const socket = io(SOCKET_URL)

export default socket
