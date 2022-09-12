import React, {useState} from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';


export default function Random (props) {
    const [place, setPlaces] = useState(null);
    function click(){
        fetch('http://127.0.0.1:5000/dates_place', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            setPlaces(data)
        })
    }
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Рандомное место
            </PanelHeader>
            {place !== null &&
            <div>
                <p>Название - {place["name"]}</p>
                <p>Тип - {place["type"]}</p>
                <p>Описание - {place["desc"]}</p>
                <p>Адрес - {place["address"]}</p>
                <p>Цена - {place["cost"]}</p>
                <p>Станция метро - {place["metro"]}</p>
                <p>Ссылка - <a target="_blank" href={place["link"]}>{place["link"]}</a></p>
            </div>}
            <Button onClick={click}>Сгенерировать</Button>
        </Panel>
    );
}

