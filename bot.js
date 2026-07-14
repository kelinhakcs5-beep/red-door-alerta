const WebSocket = require("ws");

const WS_URL = "wss://live-api.casinoscores.com/ws";

console.log("Iniciando conexão com a Red Door...");

const ws = new WebSocket(WS_URL, "v12.stomp", {
headers: {
Origin: "https://www.casino.org"
}
});

ws.on("open", () => {
console.log("WebSocket conectado!");

ws.send(
"CONNECT\n" +
"accept-version:1.2\n" +
"heart-beat:10000,10000\n\n\0"
);
});

ws.on("message", (data) => {
const mensagem = data.toString();

console.log("Mensagem recebida:", mensagem);
});

ws.on("error", (erro) => {
console.error("Erro no WebSocket:", erro.message);
});

ws.on("close", () => {
console.log("WebSocket desconectado.");
});
