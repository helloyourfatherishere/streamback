import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

var btn={
    height: '4vh',
    width: '130%'
}

const SearchField = () => {
    const classes = useStyles();
    return (
        <>
        <div className="s">
                <Button id="btn"><KeyboardBackspaceIcon style={btn} onClick={()=>{var s= document.querySelector(".s"); s.style.display= 'none';}}/></Button>
                <form action="/search" method="get">
                    <input type="search" class="d" name="search" id="search" placeholder="search here.." autoComplete="off"/>
                </form>
        </div>
            
            <SearchIcon onClick={()=>{var s= document.querySelector(".s"); s.style.display= 'flex';}}></SearchIcon>
        </>
    )
}

export default SearchField
