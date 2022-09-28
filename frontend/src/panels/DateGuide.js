import React, { useState, useEffect } from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import axios from "axios";
import Questions from "./selectComponent/Questions";
import './guidestyles.css';
import dg from '../background/guide.png'

export default function DateGuide(props) {
const [startGuide, setStartGuide] = useState(false)

function start(){
    setStartGuide(true);
}

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => window.history.back()}/>}>
                Выбор гида
            </PanelHeader>
            <div>
                {startGuide !== true &&
                    <div>
                        <img src={dg} alt="dg" class="dgphoto"/>
                        <Button onClick={start} id="buttonGuide">
                            Начнем
                        </Button>
                    </div>
                }
                {startGuide === true &&
                    <div>
                        <Questions></Questions>
                    </div>
                }
            </div>

        </Panel>
    )
}