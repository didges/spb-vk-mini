from flask_cors import CORS
from flask import Flask, request, send_file
from filter_date import filter_cost, filter_area, filter_leisure, filter_duration, definition_word, filter_count
import json
import os
import numpy as np
import requests
import urllib.request

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
            count = request_data['count']['value']

    with open("dates.json", "r", encoding="utf-8") as file:
        desc = json.load(file)
        dates = set(desc.keys())

        dates = filter_cost(dates, desc, money)
        dates = filter_area(dates, desc, district)
        dates = filter_leisure(dates, desc, relax)
        dates = filter_duration(dates, desc, long)
        dates = filter_count(dates, desc, count)
        dates = definition_word(dates)

    res = {}
    for i, data in enumerate(dates):
        res[i] = {"value": desc[data]['word'], "label": desc[data]['word']}

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


@app.route('/get_main_img', methods=['POST'])
def get_main_img():
    dirs = os.listdir("images")
    res = dict()
    for dir in dirs:
        name = dir.split('/')[-1]
        res[name] = f"images/{name}/{sorted(os.listdir(f'images/{dir}'))[0]}"
    return res


@app.route('/get_photo/<image>/<directory>/<name>', methods=['POST', 'GET'])
def get_photo(image, directory, name):
    filename = f'./{image}/{directory}/{name}'
    return send_file(filename, mimetype='image/gif')


@app.route("/get_place_images/<place>/place", methods=['GET', 'POST'])
def get_place_images(place):
    print(place)
    count = 1
    imgs = dict()
    for i in sorted(os.listdir(f"images/{place}")):
        imgs[f"word{count}"] = f"images/{place}/{i}"
        count += 1
    return imgs


@app.route("/get_kudago_places", methods=['POST'])
def get_kudago_places():
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ2a2lkMDAwMDAwMDAwIiwiZXhwIjoxNjc3ODE1ODA0fQ.mi9SqKWgj2pfunmLgWjvRYOArSKeP7qR3pLLbtnyaO4",
        "accept": "*/*"
    }

    p = {
        'lat': 59.939016, 'lng': 30.31588, 'radius': 15,
        'categories': "exhibition",
        'fields': "categories,description,id,place,title,age_restriction,is_free,images,site_url",
        "expand": "images,place,location,dates,participants",
        "is_free": False, "count": 100
    }

    response = requests.get('https://spb-afisha.gate.petersburg.ru/kg/external/afisha/events',
                            headers=headers,
                            params=p
                            )

    good_resp = {}
    arr = list(range(100))
    np.random.shuffle(arr)
    for i in arr:
        if len(response.json()['data'][i]['images']) > 1:
            try:
                urllib.request.urlopen(response.json()['data'][i]['place']['site_url']).read()
                good_resp[response.json()['data'][i]['title'].capitalize()] = {
                'site_url': response.json()['data'][i]['site_url'],
                'desk': response.json()['data'][i]['description'].capitalize(),
                'image': response.json()['data'][i]['images'][0]['image']
                }
            except:
                pass

    return good_resp


if __name__ == '__main__':
    app.run()
