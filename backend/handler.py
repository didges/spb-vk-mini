from flask import Flask, request
from filter_date import filter_cost, filter_area, filter_leisure, filter_duration, definition_word
import json

app = Flask(__name__)


@app.route('/json-example', methods=['POST'])
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
        dates = definition_word(dates)

    return dates


if __name__ == '__main__':
    app.run(debug=True, port=5000)