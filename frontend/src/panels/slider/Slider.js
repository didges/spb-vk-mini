import React, { useState, useEffect, SyntheticEvent} from 'react';
import {SvgSelector} from './SvgSelector'
import './slider.css';
import { Paper } from '@mui/material';


import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CameraIcon from '@mui/icons-material/Camera';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ImageIcon from '@mui/icons-material/Image';
export default function Slider({go}){
    const [value, setValue] = useState('home');


    const handleChange = (event: SyntheticEvent, newValue: String) => {
        console.log(newValue)
        setValue(newValue);
        go(newValue);
    }
    return(
        <div class="slider">
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
                <BottomNavigation sx={{ width: 400 , height:80}} value={value} onChange={handleChange} >
                    <BottomNavigationAction
                        label="Главная"
                        value="home"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        label="Гид"
                        value="dg"
                        icon={<ImageIcon />}
                    />
                    <BottomNavigationAction
                        label="Афиша"
                        value="kudago"
                        icon={<CalendarMonthIcon />}
                    />
                    <BottomNavigationAction
                        label="Идеи"
                        value="photo"
                        icon={<CameraAltIcon />}
                    />
                    <BottomNavigationAction
                        label="Рандом"
                        value="random"
                        icon={<CameraIcon />}
                    />
                </BottomNavigation>

            </Paper>
        </div>
    )
}