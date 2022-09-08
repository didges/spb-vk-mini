import pandas as pd
import json

places = pd.read_csv("places.csv")
places_json = {}

for place in places['МЕСТО']:
    places_json[place] = {
        "type": str(places[places["МЕСТО"] == place]["ТИП"].values[0]),
        "address": places[places["МЕСТО"] == place]["АДРЕС"].values[0],
        "cost": places[places["МЕСТО"] == place]["ЦЕНА НА ЧЕЛОВЕКА/ СРЕДНИЙ ЧЕК"].values[0],
        "metro": places[places["МЕСТО"] == place]["МЕТРО"].values[0],
        "link": places[places["МЕСТО"] == place]["ССЫЛКА"].values[0],
        "desc": places[places["МЕСТО"] == place]["ОПИСАНИЕ"].values[0]
    }

with open("places.json", 'w', encoding='utf-8') as file:
    json.dump(places_json, file, ensure_ascii=False)
