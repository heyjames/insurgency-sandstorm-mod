import urllib, json, sys

try:
    url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v1/?key=xxxxxxxxxx&steamids=" + sys.argv[1]
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    print(data['response']['players']['player'][0]['personaname'])
except:
    print("Error")
