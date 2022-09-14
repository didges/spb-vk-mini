import React, {useState, useEffect} from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import ImageGrid from "./Grid/ImageGrid";

export default function Kudago (props) {
    const [places, setPlaces] = useState(null)
    useEffect(() =>{
        fetch('http://127.0.0.1:5000/get_kudago_places', {
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
                    "desk": data[keys[i]]["desk"],
                    "image": data[keys[i]]["image"],
                    "link": data[keys[i]]["site_url"],
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
                Актуальные события
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
