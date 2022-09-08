import React, { useState, useEffect } from 'react';
import {Button, FormItem, Checkbox} from "@vkontakte/vkui";
import Select from "react-select";
import axios from "axios";
import './textAnimation.css'
const quest = [

    {
        "question": "Сколько потратим сегодня?",
        "answers": [{value: "около 1", label: "около 1"}, {value: "около 2", label: "около 2"}, {value: "около 3", label: "около 3"}, {value: "3 и больше", label: "3 и больше"}],
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
        "answers": [{value: '2', label: '2'}, {value: '4', label: '4'}, {value: '6', label: '6'}],
        "type": 1
    },
    {
        "question": "Сколько нас?",
        "answers": [{value: "Пара", label: "Пара"}, {value: "Компания", label: "Компания"}],
        "type": 1
    },
    {
        "question": "Осталось выбрать всего лишь слово",
        "type": 3
    }
]

let iterator = 0




export default function Questions(){

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
        setViewPDF(true);
        console.log(word)
        let require = {
            "word": word["label"]
        }
        fetch('http://127.0.0.1:5000/get_date_by_word', {
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


    function next(){
        let relaxReq = []
        if (answer === true) {
            if (question['type'] === 2){
                if (interactive === true){
                    relaxReq.push("Интерактивный")
                }
                if (culture === true){
                    relaxReq.push("Культурный")
                }
                if (history === true){
                    relaxReq.push("Исторический")
                }
                if (rel === true){
                    relaxReq.push("Релакс")
                }
                if (socMedia === true){
                    relaxReq.push("Конент. для соц сетей")
                }
                if (family === true){
                    relaxReq.push("Семейный")
                }
                setRelax(relaxReq)
                console.log(relaxReq)
            }
            iterator += 1;
            if (iterator === 5){
                setNotEnd(false)
                let value_for_req = {
                    "money": money,
                    "district": district,
                    "relax": relax,
                    "long": long,
                    "count": count
                }
                console.log(value_for_req)
                fetch('http://127.0.0.1:5000/dates_words', {
                    method: "POST",
                    body: JSON.stringify(value_for_req),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    let res = []
                    for (let i = 0; i < 3; i++){
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
                                    интерактивный
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setCulture(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    культурный
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setHistory(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    исторический
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setRel(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    релакс
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setSocMedia(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    конент. для соц сетей
                                </Checkbox>
                                <Checkbox onChange={(e) => {
                                    setFamily(e.target.checked);
                                    console.log(e.target.checked)
                                }}>
                                    семейный
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

                        <FormItem top={"Выберите слово"}>
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
                <iframe src={url} width="630" height="500" allow="autoplay"></iframe>
            )
        }
    }


}