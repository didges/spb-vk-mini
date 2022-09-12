import React, {useEffect, useState}from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import ImageGrid from "./Grid/ImageGrid";

export default function Photo (props) {
    const [places, setPlaces] = useState(null)
    useEffect(() =>{
        fetch('http://127.0.0.1:5000/get_main_img', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            let keys = Object.keys(data);
            let values = []
            for (let i = 0; i < keys.length; i++){
                let tmp = {
                    "name": keys[i],
                    "image": data[keys[i]]
                }
                values.push(tmp);
            }

            setPlaces(values)
        })
    }, [])
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Идеи для фотографии
            </PanelHeader>
            {places === null &&
                <div>
                    подождите
                </div>
            }
            {places !== null &&
                <div>
                    <ImageGrid data={places} ex={true}/>
                </div>}
        </Panel>
    );
}

