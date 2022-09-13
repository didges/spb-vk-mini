import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, {useState} from "react";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(101,99,99,0.5)',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

    height: 180
}));


function update(link, setData){
    console.log(link)
    fetch(link, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data)
        let keys = Object.keys(data);
        let values = []
        for (let i = 0; i < keys.length; i++){
            let tmp = {
                "name": keys[i],
                "image": "http://127.0.0.1:5000/get_photo/"+data[keys[i]],

            }
            values.push(tmp);
        }
        console.log(values)
        setData(values)
    })
}

export default function ImageGrid(props){
    console.log(props.data)
    const [data, setData] = useState(props.data)


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(data.length)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>
                            {!props.ex &&
                                <img src={data[index]["image"]} width={100} height={100}/>
                            }
                            {props.ex &&
                                <img src={props.data[index]["image"]} width={100} height={100}/>
                            }
                            {props.ex &&
                                <div>
                                    <a target="_blank" href={props.data[index]["link"]}>{props.data[index]["name"]}</a>
                                </div>
                            }
                            {!props.ex &&
                                <div>
                                    <a href="#" onClick={() => update(data[index]["link"], setData)}>{data[index]["name"]}</a>
                                </div>
                            }
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}