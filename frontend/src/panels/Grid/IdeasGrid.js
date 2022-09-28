import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, {useState} from "react";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(101,99,99,0.3)',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    height: 250,
    marginRight: 20
}));

export default function IdeasGrid(props){
    console.log(props.data)
    const [data, setData] = useState(props.data)


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {Array.from(Array(data.length)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>
                            {!props.ex &&
                                <a onClick={() => props.setter(data[index]["link"], setData)}>
                                    <img src={data[index]["image"]} width={250} height={250}/>
                                </a>
                            }
                            {props.ex &&
                                <a target="_blank" href={props.data[index]["link"]}>
                                    <img src={props.data[index]["image"]} width={250} height={250}/>
                                </a>
                            }
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}