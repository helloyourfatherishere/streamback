import React,{useEffect, useState, Component} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import More from "../components/More.jsx"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {NavLink} from "react-router-dom"
//IMPORTED MODULES
import Category from "./Category"
//IMPORTED CSS
import '../css/nav.css'
import "../css/search.css"
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  var buttons={
    margin:'.5% 1%',
    width: '100%',
    height: '5vh'
};
var btn={
    height: '4vh',
    width: '130%'
};
const Nav = ({verify}) => {
    const classes = useStyles();
    var [input, setInput] = useState("");
    return (
        <>
            <div className="s">
                    <Button id="btn"><KeyboardBackspaceIcon style={btn} onClick={()=>{
                        var s= document.querySelector(".s");
                        var nav= document.querySelector(".nav");
                        nav.style.display= "flex";
                        s.style.display= 'none';
                         }}/></Button>
                    <form action="/search"> 
                        <input type="search" name="search" autoFocus className="d" id="search" placeholder="search here.." autoComplete="off"/>
                    </form>
            </div>
            <div className="nav">
                <div className="logo">
                    <NavLink exact to="/" style={{color: 'black', textDecoration: 'none', background: 'none'}} activeClassName=""><h1>NVISION</h1></NavLink>
                </div>

                <div className="search_box">
                    <div className="search_field">
                    <form action="/search" method="get">
                    <input type="search" autoComplete="off" name="search" id="search" className="search_bar" placeholder="search here.."></input>
                    <button type="submit" className="search_btn"><SearchIcon style={{fontSize: '1.5rem'}}></SearchIcon></button>
                    </form>
                    </div>
                </div>
                <div className="opt">
                    <div className="links">
                        <div className={classes.root} id="link">
                            <Button style={buttons} id="search_icon" onClick={()=>{
                                var s= document.querySelector(".s"); 
                                var nav= document.querySelector(".nav");
                                nav.style.display="none";
                                s.style.display= "flex";
                                }}><SearchIcon /></Button>
                            <Button style={buttons} id="btns"><a href="/cart" id="cart_link"><ShoppingCartOutlinedIcon style={buttons}></ShoppingCartOutlinedIcon></a></Button>
                            <Button style={buttons} id="btns"><More style={buttons}></More></Button>
                            <Button style={buttons} id="btns"><Category style={buttons}></Category></Button>
                </div>
                </div>
                </div>
            </div>
        </>
    )   
}



export default Nav
