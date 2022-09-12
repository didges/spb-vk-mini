import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(101,99,99,0.5)',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

    height: 180
}));
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}


export default function ImageGrid(props){
    console.log(props.data)
    /*if (props.ex === false){
        for (let i = 0; i < props.data.length; i++){
            console.log(importAll(props.data["image"]))
        }
    }*/

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>
                            {!props.ex &&
                                <img src={require(props.data["image"], true)} width={100} height={100}/>
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
                                    <a href={props.data[index]["link"]}>{props.data[index]["name"]}</a>
                                </div>
                            }
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}