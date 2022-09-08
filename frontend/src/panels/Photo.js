import React from 'react';
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import ImageGrid from "./Grid/ImageGrid";

export default function Photo (props) {

    return (
        <Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Место для фотографии
            </PanelHeader>
            <Div>
                <ImageGrid/>
            </Div>
        </Panel>
    );
}

