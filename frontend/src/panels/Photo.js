import React, {useEffect, useState}from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import IdeasGrid from "./Grid/IdeasGrid";
import './gridstyles.css'

export default function Photo (props) {
    const [places, setPlaces] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [back , setBack] = useState(true);




    function goBack(){
        console.log('go back')
        setBack(!back);

            fetch('https://devteamapp.space/get_main_img', {
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
                        "image": "https://devteamapp.space/get_photo/"+data[keys[i]],
                        "link": "https://devteamapp.space/get_place_images/"+keys[i]+"/place"
                    }
                    values.push(tmp);
                }

                setPlaces(values);
                setPhoto(null);
            })
    }


    function setter(link){
        console.log('I`m working');
        setBack(!back);
        console.log(link)
        fetch(link, {
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
                    "image": "https://devteamapp.space/get_photo/"+data[keys[i]],

                }
                values.push(tmp);
            }
            console.log(values)
            setPhoto(values);
            setPlaces(null);
        })
    }
    useEffect(() =>{
       goBack();
    }, [])
    return (
        <Panel id={props.id}>
            {back === false &&
                <PanelHeader
                    left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
                >
                    Идеи для фотографии
                </PanelHeader>
            }
            {back === true &&
                <PanelHeader
                    left={<PanelHeaderBack onClick={goBack} data-to="home"/>}
                >
                    Идеи для фотографии
                </PanelHeader>
            }

            <div class="photodiv">
                {places === null && photo === null &&
                    <div>
                        подождите
                    </div>
                }
                {places !== null &&
                    <div>
                        <IdeasGrid data={places} setter={setter} ex={false}/>
                    </div>
                }
                {photo !== null &&
                    <div>
                        <IdeasGrid data={photo} ex={true}/>
                    </div>
                }
            </div>
        </Panel>
    );
}

