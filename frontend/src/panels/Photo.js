import React, {useEffect, useState}from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import IdeasGrid from "./Grid/IdeasGrid";
import './gridstyles.css'

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
            console.log(data)
            let keys = Object.keys(data);
            let values = []
            for (let i = 0; i < keys.length; i++){
                let tmp = {
                    "name": keys[i],
                    "image": "http://127.0.0.1:5000/get_photo/"+data[keys[i]],
                    "link": "http://127.0.0.1:5000/get_place_images/"+keys[i]+"/place"
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
            <div class="photodiv">
                {places === null &&
                    <div>
                        подождите
                    </div>
                }
                {places !== null &&
                    <div>
                        <IdeasGrid data={places} setData={setPlaces} ex={false}/>
                    </div>
                }
            </div>
        </Panel>
    );
}

