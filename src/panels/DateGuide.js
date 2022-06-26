import React from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import persik from "../img/persik.png";

export default function DateGuide(props) {
    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                DateGuide
            </PanelHeader>
            <Div>
                Тут будет основная работа программы
            </Div>
        </Panel>

    )
}