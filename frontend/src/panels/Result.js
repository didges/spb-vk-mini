import React from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';


export default function Result (props) {

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Результат
            </PanelHeader>
            <Div>
                {props.fetchedUser.first_name}, это тестовая страница, позже тут будут результаты работы приложения
            </Div>
        </Panel>
    );
}

