import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import Slider from "./slider/Slider";

const Home = ({ id, go, fetchedUser }) => (

	<Panel id={id}>
		<PanelHeader>Тестовая начальная страница</PanelHeader>

		{fetchedUser &&
			<Group header={<Header mode="secondary">Формальное приветствие</Header>}>
				<Div>
					Привет, {fetchedUser.first_name} {fetchedUser.last_name}, это тестовая домашняя страница, здаесь будет находиться какая-то информация
				</Div>
			</Group>
		}

		<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="s" mode="secondary" onClick={go} data-to="dg">
					Начнем работать
				</Button>
				<Button stretched size="s" mode="secondary" onClick={go} data-to="result">
					Давай посмотрим на результат
				</Button>
			</Div>
		</Group>

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
