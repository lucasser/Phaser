let clientId = null;
let gameId = null;
let playerColor = null;

let ws = new WebSocket("ws://localhost:9090")
const btnCreate = document.getElementById("btnCreate");
const btnJoin = document.getElementById("btnJoin");
const txtGameId = document.getElementById("txtGameId");
const divPlayers = document.getElementById("divPlayers");
const divBoard = document.getElementById("divBoard");

ws.onmessage = message => {
    //message.data
    const response = JSON.parse(message.data);
    //connect
    if (response.method === "connect"){
        clientId = response.clientId;
        console.log("Client id Set successfully " + clientId)
    }

    //create
    if (response.method === "create"){
        gameId = response.game.id;
        console.log("game successfully created with id " + response.game.id + " with " + response.game.balls + " balls")  
    }


    //update
    if (response.method === "update"){
        //{1: "red", 1}
        if (!response.game.state) return;
        for(const b of Object.keys(response.game.state))
        {
            const color = response.game.state[b];
            const ballObject = document.getElementById("ball" + b);
            ballObject.style.backgroundColor = color
        }

    }
}