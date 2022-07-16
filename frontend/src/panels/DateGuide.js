import React, { useState, useEffect } from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import axios from "axios";
import Questions from "./selectComponent/Questions";


export default function DateGuide(props) {
    useEffect(() => {
        axios.post('http://localhost:5000/hi').then(r => console.log(r.data));
    })

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                DateGuide
            </PanelHeader>
            <Questions></Questions>
        </Panel>
    )
}