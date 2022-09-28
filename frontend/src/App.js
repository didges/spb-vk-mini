import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Random from './panels/Random'
import DateGuide from "./panels/DateGuide";
import Photo from "./panels/Photo";
import Kudago from "./panels/Kudago";
import Slider from "./panels/slider/Slider"
const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [history, setHistory] = useState(['home']) // Заносим начальную панель в массив историй.
	const [val, setVal] = useState('home');
	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	function changePanel(name){
		setActivePanel(name);
	}

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const goBack = () => {
		if( history.length === 1 ) {  // Если в массиве одно значение:
			bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1 ) { // Если в массиве больше одного значения:
			history.pop() // удаляем последний элемент в массиве.
			setActivePanel( history[history.length - 1] )
			setVal(history[history.length - 1])// Изменяем массив с иторией и меняем активную панель.
		}
	}
	useEffect(() => {
		window.addEventListener('popstate', () => goBack());
	}, [])

	function goToPage( name ) { // В качестве аргумента принимаем id панели для перехода
		window.history.pushState( {panel: name}, name ); // Создаём новую запись в истории браузера
		setActivePanel( name ); // Меняем активную панель
		history.push( name ); // Добавляем панель в историю
		setVal(name)
	}

	function setSliderValue(value){
		setVal(value);
	}

	return (
		<ConfigProvider scheme={scheme} isWebView={true}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' fetchedUser={fetchedUser} go={goToPage} />
								<Random id='random' go={goToPage} fetchedUser={fetchedUser} />
								<DateGuide id='dg' go={goToPage} fetchedUser={fetchedUser} />
								<Kudago id='kudago' go={goToPage} fetchedUser={fetchedUser} />
								<Photo id='photo' go={goToPage} fetchedUser={fetchedUser} />
							</View>
						</SplitCol>
						<Slider go={goToPage} value={val}/>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;