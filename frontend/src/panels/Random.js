import React, {useState} from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import "./randomstyles.css";
import rnd from '../background/randomstart.png'
import {SvgSelector} from './slider/SvgSelector'

function changeBgImg(){
    var img = document.getElementById('rnd');
    img.style.display = 'none';
    var block = document.getElementById('randomdiv');
    block.style.backgroundColor = 'rgba(209, 219, 234, 0.5)';
    block.style.minHeight = '100vh';
    var but = document.getElementById('randbut');
    but.style.position = 'relative';
    but.style.top = '25px';
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
            <PanelHeader before={<PanelHeaderBack onClick={() => window.history.back()}/>}>
                Рандом
            </PanelHeader>
            <img src={rnd} id="rnd"/>

            <div id="randomdiv">
                {   place !== null && <div class="randomdata">
                    <p>{place["name"]}</p>
                    <p>{place["desc"]}</p>
                    <p>Адрес - {place["address"]}</p>
                    <p>Средняя цена - {place["cost"]}</p>
                    <p>Станция метро - {place["metro"]}</p>
                    <p class="ic"><a id="hyperlink" target="_blank" href={place["link"]}><Button id="c-button"><span id="tbtn">Перейти</span> <span class="iconr"></span></Button></a></p>
                </div>
                }

                <Button id="randbut" onClick={click}>Сгенерировать</Button>
                <div class="invisible"></div>
            </div>
        </Panel>
    );
}