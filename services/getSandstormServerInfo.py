import valve.source.a2s

try:
    SERVER_ADDRESS = ("11.111.111.11", 27015)

    with valve.source.a2s.ServerQuerier(SERVER_ADDRESS) as server:
        info = server.info()
        players = server.players()

    print("{player_count}".format(**info))
except:
    print("Error")

#print("{player_count}/{max_players} {server_name}".format(**info))
#for player in sorted(players["players"],
#                     key=lambda p: p["score"], reverse=True):
#    print("{score} {name}".format(**player))
