import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './style.css';



export default function Slider({go}){
    return(
        <ProSidebar >

            <Menu iconShape="square">
                <MenuItem onClick={go} data-to={'dg'}>
                    DG
                </MenuItem>
                <MenuItem onClick={go} data-to={'result'}>
                    Res
                </MenuItem>
                <MenuItem onClick={go} data-to={'kudago'}>
                    Kudago
                </MenuItem>
                <MenuItem onClick={go} data-to={'photo'}>
                    Photo
                </MenuItem>
            </Menu>
        </ProSidebar>
    )
}