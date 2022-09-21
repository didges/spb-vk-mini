import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import {SvgSelector} from './SvgSelector'
import './style.css';

var a = true;

function menuclick(){
    var block = document.getElementById('sidebar');
    if (a == false){
        block.style.display = "none";
        a = true;
    }
    else{
        block.style.display = "block";
        a = false;
    }
}


export default function Slider({go}){
    return(
        <div class="sidemenu">
            <div id="fixedsvg"><button onClick={menuclick}><SvgSelector id="menu"/></button></div>
            <ProSidebar id="sidebar">
                <Menu iconShape="square">
                    <MenuItem  onClick={go} data-to={'home'}>
                        <SvgSelector id="home"/>
                        <p>Главная</p>
                    </MenuItem>
                    <MenuItem onClick={go} data-to={'dg'}>
                        <SvgSelector id="guide"/>
                        <p>Выбор гида</p>
                    </MenuItem>
                    <MenuItem onClick={go} data-to={'kudago'}>
                        <SvgSelector id="poster"/>
                        <p>Афиша</p>
                    </MenuItem>
                    <MenuItem onClick={go} data-to={'photo'}>
                        <SvgSelector id="ideas"/>
                        <p>Идеи для фото</p>
                    </MenuItem>
                    <MenuItem  onClick={go} data-to={'random'}>
                        <SvgSelector id="random"/>
                        <p>Случайное место</p>
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    )
}