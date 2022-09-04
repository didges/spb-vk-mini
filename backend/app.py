from flask_cors import CORS
from flask import Flask, request, render_template
from filter_date import filter_cost, filter_area, filter_leisure, filter_duration, definition_word, filter_count
import json
import numpy as np

app = Flask(__name__)
CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'


@app.route('/dates_words', methods=['POST'])
def get_date_words():
    request_data = request.get_json()

    money = None
    district = None
    relax = None
    long = None
    count = None

    if request_data:
        if 'money' in request_data:
            money = request_data['money']

        if 'district' in request_data:
            district = request_data['district']

        if 'relax' in request_data:
            if (type(request_data['relax']) == list) and (len(request_data['relax']) > 0):
                relax = request_data['relax']

        if 'count' in request_data:
            if (type(request_data['count']) == list) and (len(request_data['count']) > 0):
                example = request_data['count']

    with open("dates.json", "r", encoding="utf-8") as file:
        desc = json.load(file)
        dates = set(desc.keys())

        dates = filter_cost(dates, desc, money)
        dates = filter_area(dates, desc, district)
        dates = filter_leisure(dates, desc, relax)
        dates = filter_duration(dates, desc, long)
        dates = filter_count(dates, desc, count)
        dates = definition_word(dates)

    res = []
    for i in dates:
        res.append({'value': i, 'label': i})

    return res


@app.route('/get_date_by_word', methods=['POST'])
def get_date_by_word():
    word = request.get_json()['word']
    with open("dates.json", "r", encoding="utf-8") as file:
        dates = json.load(file)
        match = dict()
        for date in list(dates.values()):
            match[date['word']] = date['link']
        return match[word]


@app.route('/dates_place', methods=['POST'])
def get_random_place():
    with open("places.json", "r", encoding="utf-8") as file:
        desc = json.load(file)
        places = list(desc.keys())
        chosen = places[np.random.randint(1, len(places))]
        res = desc[chosen]
        res['name'] = chosen

        return res


if __name__ == '__main__':
    app.run()
