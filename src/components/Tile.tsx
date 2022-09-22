import Paper from '@mui/material/Paper';
import '../styles/RenderedForm.css'
import {styled, Typography } from '@mui/material';

interface iTile{
    title: any,
    content: any 
    display: boolean

}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgb(0, 0, 0)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    boxShadow: 'none',
    color: 'white',
    overflowWrap: 'break-word',
    fontSize:'10px'
    
}));

const Tile = ({content,title,display}: iTile) =>{



if(display){
    return(

        <Item>
        <Typography color='rgb(5, 150, 255)' variant='h5'>{title}</Typography> 
        <Item> {content} </Item>
        </Item>
     
    )

}else{
    return(null);
}

}


export default Tile