import numpy as np
import json


# Сколько потратим
def filter_cost(dates, desc, cost):
    set_dates = set()
    for date in desc.keys():
        if cost == 1 and desc[date]["money"] > 1:
            set_dates.add(date)

        elif cost == 2 and desc[date]["money"] > 2:
            set_dates.add(date)

    res = dates - set_dates
    return res if len(res) else dates


# Район
def filter_area(dates, desc, area):
    set_dates = set()
    for date in desc.keys():
        if area == "Центральный" and desc[date]["district"] != "Центральный":
            set_dates.add(date)

        elif area == "Петроградский" and desc[date]["district"] != "Петроградский":
            set_dates.add(date)

        elif area == "Василеостровский" and desc[date]["district"] != "Василеостровский":
            set_dates.add(date)

    res = dates - set_dates
    return res if len(res) else dates


# Вид отдыха
def filter_leisure(dates, desc, leisures):
    set_dates = set()
    for date in desc.keys():
        approached = False
        for leis in leisures:
            if leis in desc[date]["relax"]:
                approached = True

        if not approached:
            set_dates.add(date)

    res = dates - set_dates
    return res if len(res) else dates


# Длительность
def filter_duration(dates, desc, time):
    set_dates = set()
    for date in desc.keys():
        if time == 2 and desc[date]["long"] > 2:
            set_dates.add(date)

        elif time == 4 and desc[date]["long"] > 4:
            set_dates.add(date)

    res = dates - set_dates
    return res if len(res) else dates


# Слово
def definition_word(dates):
    if len(dates) <= 3:
        return list(dates)
    else:
        arr = np.array(list(dates))
        np.random.shuffle(arr)
        return arr[:3]


if __name__ == '__main__':
    with open("dates.json", "r", encoding="utf-8") as file:
        desc = json.load(file)
        dates = set(desc.keys())
        dates = filter_cost(dates, desc, 2)
        dates = filter_area(dates, desc, "Центральный")
        dates = filter_leisure(dates, desc, ["Релакс", "Интерактивный", "Культурный"])
        dates = filter_duration(dates, desc, 6)
        dates = definition_word(dates)
        print(dates)
