# insurgency-sandstorm-mod for checkpoint co-op

### Description
Insurgency: Sandstorm is a tactical first-person shooter with a short time to kill. Depending on the weapon used, players and AI die within 1-3 shots. The co-op checkpoint mode consists of about 7 checkpoints depending on the map, and players must clear the first checkpoint of all bots before standing on it for 30 seconds, which "captures" it, and either a 1m30s counter-attack wave occurs or players proceed to the next checkpoint. Repeat this process until the last checkpoint is complete with at least 1 player alive.

### Problem
Rushing the objectives and "run 'n' gunning" feels like a solo effort where the only team aspect is not having to deal with a whelming amount of bots because your teammates are doing the same. Capturing an objective without clearing the area of bots results in some bots attacking you from behind. Secondly, leaving your teammates in the killzone with enemies still wandering around while the new wave of enemies spawn is also detrimental to the success of each checkpoint.

Some players aren't as skilled at first-person shooters, so they play a lot slower; some like the teamwork aspect. Playing as a team, covering a teammate's back, and capturing objectives together--on command--helps make it a more enjoyable experience and can contribute to the overall success of completing the map.

### Solution
Part of the Insurgency Sandstorm 1.4 updated introduced the ability to set game mode properties via rcon. This means we can adjust these game parameters in real-time. By adjusting the capture timer variable, we can simulate locking an objective. Locking the objective for a specific time helps give admins the time to react to players that violate the server rules when no objective rushing is enforced. 

Alongside an appropriate title, intermittent rules displayed in chat, and admins that remove offenders, it is one way to form a server identity, which in turn help attract like-minded players and encourage teamwork.

### Features
- Objectives cannot be captured until round timer reaches ~12:30. Each capture resets timer to 15:00, so it'll be locked for about 2 and a half minutes after each objective is captured. This locking feature isn't available on the caches because the game doesn't have a variable that controls the ability to prevent a cache from exploding. The idea of locking objectives was not known to be possible until I visited Cassandra Confluvium servers.
- Chat announces who joined or left the server and is logged on the server.
- Chat messages are logged on the server.
- Server periodically displays rules/messages in the chat. Automatically detects empty server and slows the messages to decrease rcon connections (RCON bug that causes zombie threads, which can cause rcon freezes, high cpu usage).
- Various scripts to get player name and associated Steam IDs, server info, server player count, and convert steam IDs to names.
- Script that sets a minimum and maximum bot count based on specific players that enter the game, whereas the default bot count would be too difficult.
- Simple kick and ban scripts that provide a reason to the player kicked as well as outputting the kicked player's name and reason in the chat.
- Announce 3 messages as an alert to new users to read chat
- Allow priority players to join past the listed server slots. Currently 2 additional priority players can join even though the server shows 6/6 for example. This can be expanded up to 16 slots.
- Chat rules only output if the game shows activity (helps decrease rcon zombie thread build-up)

### Notes
- As of this writing, modding tools are not released. New World Interactive, the game's developers, can break this mod really easily by limiting the log file output. On the otherhand, releasing more info like logging players that destroyed a cache or stepped on the objective (because this triggers camping bots to move towards the objective) can really help enforce no rush, team-oriented servers. Modding tools are said to be in the next update.
- Since the timer countdown is decoupled from the in-game round timer, it's not always in sync. I could refactor the code more or rebuild it in JavaScript or Python, but I'm concerned it will affect the countdown further as it's already sometimes off by 1-2 seconds. The rcon bug that spawns zombie threads also causes desync, but a server restart resolves this.
- I experienced a lot of problems refactoring global vars to one file or one file containing environmental variables. I believe it is due to shells and subshells. Running scripts in background while already in the background also caused issues.
- It's all working, but it's not really efficient as it requires running each service in its own terminal. This does help with being in the experimental phase because I can immediately test an idea; fix, or improve something during a game with players, and it won't affect other areas of the mod. Migrating this to Node.js or Python would be a fantastic project, but could potentially be for nought depending how NWI moves the game forward with its mod tools.
- A web interface to tie all of this would be really cool.

### Required
- RCON Application to send commands to server https://github.com/n0la/rcon
- Get various server/player Info https://github.com/serverstf/python-valve

### Future additions
- Add smart chat rules: Turn off chat rules if all players in game are regulars/admins to declutter the chatbox.
- Enable admins to enter a command command to adjust the game settings like bot count or AI difficulty ("!minbots 5" or "!maxbots 12").
- Build player profiles so users/admins can see in chat when a player enters if they're a regular, times kicked, rushers, new and non-new players.
