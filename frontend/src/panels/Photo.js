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
    const [photo, setPhoto] = useState(null);
    const [back , setBack] = useState(true);

    function goBack(){
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
            backToTop();
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
                <PanelHeader>
                    Идеи для 📷
                </PanelHeader>
            }
            {back === true &&
                <PanelHeader
                    left={<PanelHeaderBack onClick={goBack} data-to="home"/>}
                >
                    Идеи для 📷
                </PanelHeader>
            }

            <div class="photodiv">
                {places === null && photo === null &&
                    <div className="loader">
                        <TailSpin color="#067185"/>
                    </div>
                }
                {places !== null &&
                    <div>
                        <IdeasGrid data={places} setter={setter} ex={false}/>
                    </div>
                }
                {photo !== null &&
                    <div>
                        <p><a name="top"></a></p>
                        <IdeasGrid data={photo} ex={true}/>
                    </div>
                }
            <div class="invisible"></div>
            </div>
        </Panel>
    );
}