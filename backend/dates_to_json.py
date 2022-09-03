import pandas as pd
import json

dates = pd.read_csv("dates.csv")
dates_json = {}

time = dates["Как долго погуляем?"]
time = [int(t.split(" ")[1]) for t in time]
dates["Как долго погуляем?"] = time

cost = dates["Сколько потратим сегодня?"]
cost = [(int(c.split(" ")[1].split(";")[0])) for c in cost]
dates["Сколько потратим сегодня?"] = cost

rest = dates["Люблю активный отдых. А ты?"]
rest = [r.split(", ") for r in rest]
dates["Люблю активный отдых. А ты?"] = rest

count = dates["Сколько нас?"]
count = [c.split("; ") for c in count]
dates["Сколько нас?"] = count


for date in dates['Название']:
    dates_json[date] = {
        "money": int(dates[dates["Название"] == date]['Сколько потратим сегодня?'].values[0]),
        "district": dates[dates["Название"] == date]["В каком районе зажигаем?"].values[0],
        "relax": dates[dates["Название"] == date]["Люблю активный отдых. А ты?"].values[0],
        "long": int(dates[dates["Название"] == date]["Как долго погуляем?"].values[0]),
        "count": dates[dates["Название"] == date]["Сколько нас?"].values[0],
        "word": dates[dates["Название"] == date]["Осталось выбрать всего лишь слово"].values[0]
    }

with open("dates.json", 'w', encoding='utf-8') as file:
    json.dump(dates_json, file, ensure_ascii=False)
