import React, { useState, useEffect } from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import axios from "axios";
import Questions from "./selectComponent/Questions";
import './guidestyles.css';

export default function DateGuide(props) {


    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Выбор гида
            </PanelHeader>
            <div class="guidediv">
                <Questions></Questions>
            </div>
        </Panel>
    )
}