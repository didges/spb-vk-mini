import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import {SvgSelector} from './SvgSelector'
import './style.css';

export default function Slider({go}){
    return(
        <ProSidebar >

            <Menu iconShape="square">
                <MenuItem  onClick={go} data-to={'home'}>
                    <SvgSelector id="home"/>
                    <p>Home</p>
                </MenuItem>
                <MenuItem onClick={go} data-to={'dg'}>
                    <SvgSelector id="guide"/>
                    <p>DG</p>
                </MenuItem>
                <MenuItem onClick={go} data-to={'kudago'}>
                    <SvgSelector id="poster"/>
                    <p>Kudago</p>
                </MenuItem>
                <MenuItem onClick={go} data-to={'photo'}>
                    <SvgSelector id="ideas"/>
                    <p>Photo</p>
                </MenuItem>
                <MenuItem  onClick={go} data-to={'random'}>
                    <SvgSelector id="random"/>
                    <p>Random</p>
                </MenuItem>
            </Menu>
        </ProSidebar>
    )
}