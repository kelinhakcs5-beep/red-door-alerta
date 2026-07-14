const WebSocket = require("ws");

const WS_URL = "wss://live-api.casinoscores.com/ws";
const ws = new WebSocket(WS_URL, "v12.stomp", {
headers: { Origin: "https://www.casino.org" }
});

function sendFrame(command, headers = {}) {
let frame = command + "\n";
for (const [key, value] of Object.entries(headers)) {
frame += `${key}:${value}\n`;
}
frame += "\n\0";
ws.send(frame);
}

ws.on("open", () => {
console.log("WebSocket conectado!");

sendFrame("CONNECT", {
"accept-version": "1.2",
"heart-beat": "15000,15000"
});
});

ws.on("message", (data) => {
const msg = data.toString();

if (msg.startsWith("CONNECTED")) {
console.log("STOMP conectado!");
  
