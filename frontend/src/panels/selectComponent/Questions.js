import React, { useState, useEffect } from 'react';
import {Button, FormItem, Checkbox} from "@vkontakte/vkui";
import Select from "react-select";
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
    let selectedOption = [money, district, relax, long, count];
    let setSelectedOption = [setMoney, setDistrict, setRelax, setLong, setCount];

    const [question, setQuestion] = useState(quest[0]);


    function next(){
        if (answer === true) {
            iterator += 1;
            if (iterator === 5){
                setNotEnd(false)
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
    if (notEnd === true){
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
                            <Checkbox onChange={(e) => console.log(e.target.checked)}>
                                интерактивный
                            </Checkbox>
                            <Checkbox onChange={(e) => console.log(e.target.checked)}>
                                культурный
                            </Checkbox>
                            <Checkbox onChange={(e) => console.log(e.target.checked)}>
                                исторический
                            </Checkbox>
                            <Checkbox onChange={(e) => console.log(e.target.checked)}>
                                релакс
                            </Checkbox>
                            <Checkbox onChange={(e) => console.log(e.target.checked)}>
                                конент. для соц сетей
                            </Checkbox>
                            <Checkbox onChange={(e) => console.log(e.target.checked)}>
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
    } else{
        return (
            <div>
                Спасибо
            </div>
        )
    }


}