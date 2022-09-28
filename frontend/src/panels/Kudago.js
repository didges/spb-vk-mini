import React, {useState, useEffect} from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import ImageGrid from "./Grid/ImageGrid";
import './gridstyles.css'
import { TailSpin } from 'react-loader-spinner';

export default function Kudago (props) {
    const [places, setPlaces] = useState(null)
    useEffect(() =>{
        fetch('https://devteamapp.space/get_kudago_places', {
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
            <PanelHeader>
                Афиша
            </PanelHeader>
            <div class="photodiv">
                {places === null &&
                    <div className="loader">
                        <TailSpin color="#067185"/>
                    </div>
                }
                {places !== null &&
                <div>
                    <ImageGrid data={places} ex={true}/>
                </div>
                }
            </div>
        </Panel>
    );


}

