import React, { useState, useEffect } from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import axios from "axios";
import Questions from "./selectComponent/Questions";
import './guidestyles.css';

export default function DateGuide(props) {
const [startGuide, setStartGuide] = useState(false)

function start(){
    setStartGuide(true);
}

    return (
        <Panel id={props.id}>
            <PanelHeader>
                Выбор гида
            </PanelHeader>
            <div>
                {startGuide !== true &&
                    <div className="guidediv">
                        <Button onClick={start} className="buttonGuide">
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