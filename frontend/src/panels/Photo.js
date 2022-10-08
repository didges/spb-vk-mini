import React, {useEffect, useState}from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import IdeasGrid from "./Grid/IdeasGrid";
import './gridstyles.css'
import { TailSpin } from 'react-loader-spinner';

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}

export default function Photo (props) {
    const [places, setPlaces] = useState(null);


    function goBack(){
        props.setBack(!props.back);

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
            props.setPhoto(null);
        })
    }


    function setter(link){
        props.setBack(!props.back);
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
            backToTop();
            props.setPhoto(values);
            props.goToPage('photo');
        })
    }
    useEffect(() =>{
        goBack();
    }, [])


    console.log('props.photo', props.photo)
    return (
        <Panel id={props.id}>
            {props.back === false &&
                <PanelHeader>
                    Идеи для 📷
                </PanelHeader>
            }
            {props.back === true &&
                <PanelHeader
                    left={<PanelHeaderBack onClick={goBack} data-to="home"/>}
                >
                    Идеи для 📷
                </PanelHeader>
            }

            <div class="photodiv">
                {places === null && props.photo === null &&
                    <div className="loader">
                        <TailSpin color="#067185"/>
                    </div>
                }
                {places !== null && props.photo === null &&
                    <div>
                        <IdeasGrid data={places} setter={setter} ex={false}/>
                    </div>
                }
                {props.photo !== null &&
                    <div>
                        <p><a name="top"></a></p>
                        <IdeasGrid data={props.photo} ex={true}/>
                    </div>
                }
                <div class="invisible"></div>
            </div>
        </Panel>
    );
}