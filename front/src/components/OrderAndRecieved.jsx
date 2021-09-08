import React,{useState, useEffect, Component} from 'react'
import {useHistory, useParams} from "react-router-dom"
import Nav from "./Nav.jsx"
import "../css/order.css"
import CartLink from "./CartLink.jsx"
const OrderAndRecieved = () => {
    var {type}= useParams();
    var history= useHistory();
    var [product, setProduct]= useState([]);
    var [message, setMessage]= useState("");
    var [total, setTotal]= useState(0);
    useEffect(()=>{
        if(type==="order" || type==="recieved"){
            var find= async function(){
                try{
                    var fetch_user= await fetch("/verify_user");
                    var data= await fetch(`/u/${type}`);
                    let verified= await fetch_user.json();
                    var res= await data.json();
                    setProduct(res.product)
                    if(verified.verify_user){
                        if(type==="order"){
                            setMessage("List of Your Order Details")
                        }
                        else{
                            setMessage("Products You Recieved")
                        }
                    }
                    else{
                        history.push("/login")
                    }
                }
                catch(e){
                }
            };
            find();
        }
        else{
            alert("This page does not exist")
            history.push("/");
        }
    },[type]);
    if(product.length===0){
        return(
            <>
            <Nav></Nav>
            <CartLink></CartLink>
                <div className="order_head">
                    <p>{message}</p>
                </div>
            <p>No Results Found.</p>
        </>
        )
        
    }
    return (
        <>
        <div className="main_order">
            <Nav></Nav>
            <CartLink></CartLink>
            <div className="order_head">
                <p>{message}</p>
            </div>
            <div className="order_cards">
            {product.map((val,i)=>{
                if(val!== null){
                     var orderDetails=val.orderDetails;
                return(
                            <>
                            {orderDetails.map((val, i)=>{
                                return(
                                    <>
                                    <a href={`/view/${val.id}`} className="order_link" key={i}>
                                    <div className="order_card">
                                    <div className="order_view">
                                    <div className="img_order">
                                    <img src={val.img} alt="image" />
                                    </div>
                                    <div className="order_title">
                                        <p>{val.title}</p>
                                    </div>
                                </div>
                                <hr />
                            <div className="order_detail">
                                <div className="det">
                                    <p>Colours: <span className="span">{val.colors}</span></p>
                                    <p>Size: <span className="span">{val.sizes}</span></p>
                                </div>
                                <div className="det">
                                    <p>Quantity: <span className="span">{val.quantity}</span></p>
                                    <p>Price: <span className="span">{val.price}</span></p>
                                </div>
                            </div>
                            <hr />
                                <div className="total">
                                    <p>Totoal Price: <span className="span">{val.quantity * val.price}</span></p>
                                </div> 
                                </div>
                                </a>
                                    </>
                                )
                            })}
                        </>
                )
                }
               
            })}
            </div>
            
        </div>
            
        </>
    )
}

export default OrderAndRecieved
