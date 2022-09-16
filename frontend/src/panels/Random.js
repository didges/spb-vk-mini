import React, {useState} from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import "./randomstyles.css";

function changeBgImg(){
    var block = document.getElementById('randomdiv');
    block.style.backgroundImage = "url('https://drive.google.com/uc?export=download&id=1O0QKaVkQEG0OP0GJLmeqUVoDTO2pQf1n')";
}


export default function Random (props) {
    const [place, setPlaces] = useState(null);
    function click(){
        fetch('https://devteamapp.space/dates_place', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            changeBgImg()
            setPlaces(data)
        })

    }
    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={props.go} data-to="home"/>}>
                Рандомное место
            </PanelHeader>
            <div id="randomdiv">

            {   place !== null && <div class="randomdata">
                <p>{place["name"]}</p>
                <p>Описание - {place["desc"]}</p>
                <p>Адрес - {place["address"]}</p>
                <p>Цена - {place["cost"]}</p>
                <p>Станция метро - {place["metro"]}</p>
                <p>Ссылка - <a target="_blank" href={place["link"]}>{place["link"]}</a></p>
                </div>
            }

            <Button id="randbut" onClick={click}>Сгенерировать</Button>
            </div>
        </Panel>
    );
}
