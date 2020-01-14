const str = " 278	 | James		 | 76500000000000000	 | 12.345.678.90	 | 0	 | 286	 | TrgerHpy		 | 76500000000000000	 | 12.345.678.90	 | 545	 | 290	 | zeppler		 | 76500000000000000	 | 12.345.678.90	 | 0	 | 291	 | Cookson.K	 | 76500000000000000	 | 12.345.678.90	 | 385		 | 0	 | Rifleman		 | INVALID		 | 		 | 0		 | 292	 | Animal Planet	 | 76500000000000000	 | 12.345.678.90	 | 0	 | 0	 | Observer		 | INVALID		 | 		 | 0		 | 0	 | Commander	 | INVALID		 | 		";
const str2 = "";

const regex = /\s\d\d\d\t\s\|\s.*?\t?\t\s\|\s765/g;
const regex2 = /765\d+/g
const playerArray = str.match(regex);

const myJsonObj = {};
myJsonObj["players"] = [];
myJsonObj["numPlayers"] = 0;

if (playerArray !== null) {
  const player64Array = str.match(regex2);
  // console.log(player64Array);
	const playerCount = playerArray.length;
	const namesArray = playerArray.map(s => s.replace(/\t/g, '').slice(7, -6));

	myJsonObj["numPlayers"] = playerCount;

  let arr = [];
  for (let i=0; i<playerCount; i++) {
    let obj = {};
    obj["name"] = namesArray[i];
    obj["steamId64"] = player64Array[i];
    arr.push(obj);
  }

  myJsonObj["players"] = arr;
}

console.log(myJsonObj);

for (i=0; i<myJsonObj.numPlayers; i++) {
  console.log(i+1 + ". " + myJsonObj.players[i].name);
}
