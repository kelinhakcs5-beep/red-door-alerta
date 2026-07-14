const WebSocket = require("ws");

const WS_URL = "wss://live-api.casinoscores.com/ws";

let ws;
let heartbeat;

function conectar() {
console.log("Iniciando conexao com o Red Door...");

ws = new WebSocket(WS_URL, "v12.stomp", {
headers: {
Origin: "https://www.casino.org"
}
});

ws.on("open", () => {
console.log("WebSocket conectado!");

ws.send(
"CONNECT\n" +
"accept-version:1.2\n" +
"heart-beat:15000,15000\n\n\0"
);
});

ws.on("message", (data) => {
const mensagem = data.toString();

if (mensagem.startsWith("CONNECTED")) {
console.log("STOMP conectado!");

heartbeat = setInterval(() => {
if (ws.readyState === WebSocket.OPEN) {
ws.send("\n");
}
}, 10000);

ws.send(
"SUBSCRIBE\n" +
"id:sub-0\n" +
"destination:/topic/spins/red-door-roulette\n\n\0"
);

console.log("Canal dos giros assinado!");
return;
}

if (mensagem.trim() !== "") {
console.log("Mensagem recebida:", mensagem);
}
});

ws.on("error", (erro) => {
console.error("Erro no WebSocket:", erro.message);
});

ws.on("close", () => {
console.log("WebSocket desconectado.");

clearInterval(heartbeat);

setTimeout(() => {
console.log("Tentando reconectar...");
conectar();
}, 5000);
});
}

conectar();
  
