import React, { useState, useEffect } from 'react';
import {Button, FormItem, Checkbox} from "@vkontakte/vkui";
import Select from "react-select";
import axios from "axios";
import './textAnimation.css'
import {func} from "prop-types";
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
        "question": "Какой ты любишь отдых?",
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
        "question": "Осталось выбрать тему Дэйта",
        "type": 1
    }
]






export default function Questions() {
    const [isAnswer, setIsAnswer] = useState(false);
    const [iterator, setIterator] = useState(0);
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
    const [threeWords, setThreeWords] = useState(null);
    const [word, setWord] = useState(null);
    const [viewPDF, setViewPDF] = useState(false);
    const [url, setUrl] = useState(null);
    let selectedOption = [money, district, [], long, count, word];
    let setSelectedOption = [setMoney, setDistrict, setRelax, setLong, setCount, setWord];

    function restart() {
        setIterator(0);
        setIsAnswer(false);
        setMoney(null);
        setDistrict(null)
        setRelax(null)
        setLong(null)
        setCount(null)
        setInteractive(false)
        setCulture(false)
        setHistory(false)
        setRel(false)
        setSocMedia(false)
        setFamily(false)
        setThreeWords(null)
        setViewPDF(false)
        setUrl(null)
        selectedOption = [money, district, [], long, count, word];
        setSelectedOption = [setMoney, setDistrict, setRelax, setLong, setCount, setWord];
    }

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

    function request_date_words(){
        console.log('in request')
        let value_for_req = {
            "money": money,
            "district": district,
            "relax": relax,
            "long": long,
            "count": count
        }
        console.log(`value_for_req = ${JSON.stringify(value_for_req)}`)
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

    function set_ans(){
        let relaxReq = [];
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
        if (relaxReq.length !== 0){
            selectedOption[iterator] = relaxReq;
            setRelax(relaxReq);
        }
        console.log(`set ans = ${selectedOption[iterator]}`)
        next_quest()
    }


    function next_quest(){

        if (selectedOption[iterator] !== null) {
            if (quest[iterator]["type"] === 2 && selectedOption[iterator].length !== 0) {
                setIterator(iterator + 1);
                setIsAnswer(false);
            }
            if (quest[iterator]["type"] !== 2) {
                if (iterator === 4) {
                    console.log('go to request');
                    request_date_words()
                }
                setIterator(iterator + 1);
                setIsAnswer(false)
            }
        }
    }
    function back(){
        setIsAnswer(false);
        if (iterator !== 0){
            setIterator(iterator-1);
        }
    }

    function next_answer(){
        setIsAnswer(true)
    }

    if(viewPDF === false){
        if (isAnswer === false) {
            return (
                <div>
                    <div className="wrapper">
                        <h1 className="title"> {quest[iterator]['question']}</h1>
                    </div>
                    <Button id="forwardbut" stretched={false} onClick={next_answer}> Ответить</Button>
                    <Button id="backbut" stretched={false} onClick={back}> Назад</Button>
                </div>
            )

        }
        if (isAnswer === true) {
            if (quest[iterator]['type'] === 1) {
                console.log(`iterator = ${iterator}`)
                console.log(`quest[iterator]["answers"] = ${quest[iterator]["answers"]}`)
                let tmp_ans;
                if (iterator === 5) {
                    tmp_ans = threeWords;
                } else {
                    tmp_ans = quest[iterator]["answers"];
                }
                console.log("tmp", iterator, tmp_ans);
                if (tmp_ans === null) {
                    return (
                        <div>
                            <p> Подождите</p>
                        </div>
                    )
                } else {
                    return (
                        <div style={{minWidth: 100}}>
                            <FormItem top={quest[iterator]['question']}>
                                <Select
                                    className="selectform"
                                    defaultValue={selectedOption[iterator]}
                                    onChange={setSelectedOption[iterator]}
                                    options={tmp_ans}
                                />
                            </FormItem>
                            {iterator === 5 &&
                                <div>
                                    <Button id="forwardbut" onClick={choose_word}> Подтвердить</Button>
                                    <Button id="backbut" stretched={false} onClick={back}> Назад</Button>
                                </div>
                            }
                            {iterator !== 5 &&
                                <div>
                                    <Button id="forwardbut" onClick={next_quest}> Подтвердить</Button>
                                    <Button id="backbut" stretched={false} onClick={back}> Назад</Button>
                                </div>
                            }
                        </div>
                    )
                }
            }
            if (quest[iterator]['type'] === 2) {
                return (
                    <div style={{minWidth: 100}}>
                        <FormItem top={quest[iterator]['question']}>
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
                        <Button onClick={set_ans}> Далее</Button>
                        <Button id="backbut" stretched={false} onClick={back}> Назад</Button>
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
                <div>
                    <iframe src={url} width="666" height="550" allow="autoplay"/>
                    <Button onClick={restart}> Начать с начала</Button>
                </div>

            )
        }
    }






}