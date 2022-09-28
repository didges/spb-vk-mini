import React from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, PanelHeaderBack} from '@vkontakte/vkui';
import Slider from "./slider/Slider";
import './homestyles.css';
import main_page from '../background/main_page.png'

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
	<PanelHeader before={<PanelHeaderBack onClick={() => window.history.back()}/>}>
        Главная
    </PanelHeader>

	<div class="maindiv">
        <img src={main_page} alt="DateGuide_description" class="responsive"/>
    </div>
	</Panel>

);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
