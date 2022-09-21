import React, { useState, useEffect } from 'react';
import {Button, FormItem, Checkbox} from "@vkontakte/vkui";
import Select from "react-select";
import axios from "axios";
import './textAnimation.css'
const quest = [

    {
        "question": "Сколько потратим сегодня?",
        "answers": [{value: "около 1000 рублей", label: "около 1000 рублей"}, {value: "около 2000 рублей", label: "около 2000 рублей"}, {value: "около 3000 рублей", label: "около 3000 рублей"}, {value: "3000 рублей и больше", label: "3000 рублей и больше"}],
        "type": 1
    },
    {
        "question": "В каком районе зажигаем?",
        "answers": [{value: "Петроградский", label: "Петроградский"}, {value: "Василеостровский", label: "Василеостровский"}, {value: "Центральный", label: "Центральный"}],
        "type": 1
    },
    {
        "question": "Люблю активный отдых. А ты?",
        "type": 2
    },
    {
        "question": "Как долго погуляем?",
        "answers": [{value: '2 часа', label: '2 часа'}, {value: '4 часа', label: '4 часа'}, {value: '6 часов', label: '6 часов'}],
        "type": 1
    },
    {
        "question": "Сколько нас?",
        "answers": [{value: "Пара", label: "Пара"}, {value: "Компания", label: "Компания"}],
        "type": 1
    },
    {
        "question": "Осталось выбрать всего лишь слово, которое будет ассоциироваться с предстоящим Дэйтом",
        "type": 3
    }
]






export default function Questions(){
    const [iterator, setIterator] = useState(1);
    const [notEnd, setNotEnd] = useState(true);
    const [answer, setAnswer] = useState(false);
    const [money, setMoney] = useState(null);
    const [district, setDistrict] = useState(null);
    const [relax, setRelax] = useState(null);
    const [long, setLong] = useState(null);
    const [count, setCount] = useState(null);
    const [interactive, setInteractive] = useState(false);
    const [culture, setCulture] = useState(false);
    const [history, setHistory] = useState(false);
    const [rel, setRel] = useState(false);
    const [socMedia, setSocMedia] = useState(false);
    const [family, setFamily] = useState(false);
    const [word, setWord] = useState(null);
    const [threeWords, setThreeWords] = useState(null);
    const [viewPDF, setViewPDF] = useState(false);
    const [url, setUrl] = useState(null);
    let selectedOption = [money, district, relax, long, count];
    let setSelectedOption = [setMoney, setDistrict, setRelax, setLong, setCount];

    const [question, setQuestion] = useState(quest[0]);
    function choose_word(){
        if (word !== null){
            setViewPDF(true);
            console.log(word)
            let require = {
                "word": word["label"]
            }
            fetch('https://devteamapp.space/get_date_by_word', {
                method: "POST",
                body: JSON.stringify(require),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function(response) {
                return response.text();
            }).then(function(data) {
                setUrl(data);
                console.log(data)
            })
        }
    }


    function next(){
        let goNext = true;
        if (answer === true){
            console.log("question['type'] === ", question['type'])
            if (question['type'] === 1){
                if (selectedOption[iterator] === null){
                    goNext = false;
                }
            } else if (question['type'] === 2){
                if (interactive === false && culture === false && history === false && rel === false && socMedia === false && family === false){
                    goNext = false;
                }
            }
        }
        if (goNext){
            let relaxReq = []
            if (answer === true) {
                if (question['type'] === 2) {
                    if (interactive === true) {
                        relaxReq.push("Интерактивный")
                    }
                    if (culture === true) {
                        relaxReq.push("Культурный")
                    }
                    if (history === true) {
                        relaxReq.push("Исторический")
                    }
                    if (rel === true) {
                        relaxReq.push("Релакс")
                    }
                    if (socMedia === true) {
                        relaxReq.push("Конент. для соц сетей")
                    }
                    if (family === true) {
                        relaxReq.push("Семейный")
                    }
                    setRelax(relaxReq)
                    console.log(relaxReq)
                }
                setIterator(iterator+1)
                if (iterator === 5) {
                    setNotEnd(false)
                    let value_for_req = {
                        "money": money,
                        "district": district,
                        "relax": relax,
                        "long": long,
                        "count": count
                    }
                    console.log(value_for_req)
                    fetch('https://devteamapp.space/dates_words', {
                        method: "POST",
                        body: JSON.stringify(value_for_req),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        let res = []
                        for (let i = 0; i < 3; i++) {
                            res.push(data[i])
                        }
                        console.log(res);
                        setThreeWords(res)
                    })
                }
                console.log(iterator);
                setQuestion(quest[iterator]);
                setAnswer(false);
            } else {
                setAnswer(true);
            }
        }

        console.log(iterator)

    }
    console.log('not end = ', notEnd, "iter = ", iterator)
    if (viewPDF === false){
        if (notEnd === true) {
            if (answer === false && notEnd === true) {
                return (
                    <div>
                        <div class="wrapper">
                            <h1 class="title"> {question['question']}</h1>
                        </div>
                        <Button stretched={false} onClick={next}> Ответить</Button>
                    </div>

                )
            } else {
                if (question['type'] === 1) {
                    return (
                        <div style={{minWidth: 100}}>

                            <FormItem top={question['question']}>
                                <Select
                                    defaultValue={selectedOption[iterator]}
                                    onChange={setSelectedOption[iterator]}
                                    options={question["answers"]}
                                />
                            </FormItem>
                            <Button stretched={false} onClick={next}> Подтвердить</Button>
                        </div>
                    )
                } else if (question['type'] === 2) {
                    return (
                        <div style={{minWidth: 100}}>
                            <FormItem top={question['question']}>
                                <Checkbox onChange={(e) => {
                                    setInteractive(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    Интерактивный
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setCulture(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    Культурный
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setHistory(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    Исторический
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setRel(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    Релакс
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setSocMedia(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    Конент. для соц сетей
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setFamily(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    Семейный
                                </Checkbox>
                            </FormItem>
                            <Button stretched={false} onClick={next}> Далее</Button>
                        </div>
                    )
                } else {
                    return (
                        <div style={{minWidth: 100}}>
                            <FormItem top={question['question']}>
                                <input type="text" name="name"/>
                            </FormItem>
                            <Button stretched={false} onClick={next}> Далее</Button>
                        </div>
                    )
                }
            }
        } else {
            if (threeWords === null) {
                return (
                    <div>
                        Подождите
                    </div>
                )
            } else {
                return (
                    <div style={{minWidth: 100}}>

                        <FormItem top={"Выберите слово, которое будет ассоциироваться с предстоящим Дэйтом"}>
                            <Select
                                defaultValue={word}
                                onChange={setWord}
                                options={threeWords}
                            />
                        </FormItem>
                        <Button stretched={false} onClick={choose_word}> Подтвердить</Button>
                    </div>
                )
            }
        }
    } else{
        if (url === null){
            return (
                <div>
                    Подождите
                </div>
            )
        } else{
            return (
                <iframe src={url} width="410" height="850" allow="autoplay"></iframe>
            )
        }
    }


}