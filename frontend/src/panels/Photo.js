import React, {useEffect, useState}from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import ImageGrid from "./Grid/ImageGrid";

export default function Photo (props) {
    const [places, setPlaces] = useState(null)
    useEffect(() =>{
        fetch('http://127.0.0.1:5000/get_place_images', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            let keys = Object.keys(data);
            let values = []
            /*for (let i = 0; i < keys.length; i++){
                let tmp = {
                    "name": keys[i],
                    "desk": data[keys[i]]["desk"],
                    "image": data[keys[i]]["image"],
                    "link": data[keys[i]]["site_url"],
                }
                values.push(tmp);
            }*/

            setPlaces(values)
        })
    }, [])
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Место для фотографии
            </PanelHeader>
            <Div>
               
            </Div>
        </Panel>
    );
}

