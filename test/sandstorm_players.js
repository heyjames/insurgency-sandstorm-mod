// https://github.com/tehbeard/node-rcon
var Rcon = require('../node-rcon').newHandle;
var rcon = new Rcon();
let connTimer;

start();

function start() {
  startConnTimer();
  rcon.connect("11.11.111.111", 27015, "yourRconPassword", onConnected);
}

// Try connecting for 5 seconds.
function startConnTimer() {
  connTimer = setTimeout(() => {
    console.log("Connection timed out. Server didn't respond.");
    process.exit(0);
  }, 6000);
}

function onConnected(err, response) {
  clearTimeout(connTimer);

  if (err) { console.error(err); return; }
  console.log("Connected.");

  rcon.sendCommand("listplayers", function (err, response) {
    // const countBySteamId = (result.match(/765/g) || []).length;
    getPlayerInfo(response.data);

    process.exit(0);
  });

  rcon.end();
}

function getPlayerInfo(str) {
  const regex = /\s\d\d\d\t\s\|\s.*?\t?\t\s\|\s765/g;
  const regex2 = /765\d+/g

  const player64Array = str.match(regex2);

  const myJsonObj = {};
  myJsonObj["players"] = [];
  myJsonObj["numPlayers"] = 0;

  if (player64Array !== null) {

    const playerArray = str.match(regex);

    const playerCount = playerArray.length;
    const namesArray = playerArray.map(s => s.replace(/\t/g, '').slice(7, -6));

    myJsonObj["numPlayers"] = playerCount;

    let arr = [];
    for (let i = 0; i < playerCount; i++) {
      let obj = {};
      obj["name"] = namesArray[i];
      obj["steamId64"] = player64Array[i];
      arr.push(obj);
    }

    myJsonObj["players"] = arr;
  }

  // console.log(str.data);
  // console.log(myJsonObj);

  console.log(myJsonObj.numPlayers + "/8 Player(s)");
  for (i = 0; i < myJsonObj.numPlayers; i++) {
    console.log(i + 1 + ". " + myJsonObj.players[i].name);
  }
}