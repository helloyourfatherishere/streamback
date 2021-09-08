import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import MarkunreadMailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import {NavLink} from "react-router-dom"
import "../css/cartopt.css"
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const CartLink = () => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.root} id="cart_list">
            <a className="cart_opt"  href="/cart" ><Button><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon></Button></a>
            <a className="cart_opt"   href="/user/order" ><Button><AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon></Button></a>
            <a className="cart_opt"  href="/user/recieved" ><Button><MarkunreadMailboxOutlinedIcon></MarkunreadMailboxOutlinedIcon></Button></a>              
            </div>
        </>
    )
}
export default CartLink
