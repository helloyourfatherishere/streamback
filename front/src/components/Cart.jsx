import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import Nav from"./Nav.jsx";
import "../css/cart.css";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import CartLink from "./CartLink.jsx"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
var input_style={
    width: '100%',
    margin: 'auto, 5%',
    marginTop:'10px',
    height: 'auto'
}

var s={
    fontSize: '15px'
}

const Cart = () => {
    var history= useHistory();
    var[userId, setUserId]= useState("");
    var [product, setProduct]= useState([]);
    var [remove, setRemove]= useState(0);
    var [message, setMessage]= useState("");
    var cutPrice;
    var mainPrice;
    var rate;
    var name;
    var email;
    var phone;
    var whatsapp;
    var address;
    
    useEffect(()=>{
        var findCart= async function(){
            try{
                let data= await fetch("/u/cart",{
                    method: 'POST',
                    headers:{"Content-Type": "application/json"},
                    body:""
                });
                let verify= await fetch("/verify_user");
                let v=await verify.json();
                let res= await data.json();
                let verified= v.verify_user;
                if(verified){
                    if(!res){
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent="login first"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                setTimeout(()=>{history.push("/login")}, 1000)
                    }
                    else{
                        if(res.product.length===0){
                            setMessage("No Carted Products:")
                            var btn= document.querySelector("#order_btn");
                            btn.style.display="none";
                        }
                        else{
                        setUserId(res.userId);
                        setProduct(res.product)
                        setMessage("")
                        }
                    }
                }
                else{
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    x.textContent="login first"
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    setTimeout(()=>{history.push("/login")}, 1000)
                }
            }
            catch(e){
            }
        };
        findCart()
    },[remove]);
    
var cancel= async function(p_id){
    let i=0
    try{
        let data= await fetch(`/removeCart/${userId}/${p_id}`,{
            method:"POSt",
            headers: {"Content-Type": "application/json"},
            body: ""
        })
        let res= await data.json();
        console.log(res)
        setRemove(p_id)
    }
    catch(e){
    }
};
function show(){
    var user_div= document.querySelector("#userDetails")
    var OrderBtn= document.querySelector("#order_btn");
    OrderBtn.style.display="none"
    user_div.style.display="block";
}
function hide(){
    var user_div= document.querySelector("#userDetails");
    var OrderBtn= document.querySelector("#order_btn");
    OrderBtn.style.display="block"
    user_div.style.display="none";
}
function det(){
    var name= document.getElementById("name").value;
    var email= document.getElementById("email").value;
    var phone= document.getElementById("phone").value;
    var whatsapp= document.getElementById("whatsapp").value;
    var address= document.getElementById("address").value;
    var cart_cards= document.querySelector(".cart_cards");
    cart_cards.style.display="none";
    var verify_email
    if(!email.includes("@")){
        alert("Include Valid Email")
        verify_email= false
    }
    else{
            verify_email= true
            if(name.length>5 && verify_email && phone.length>8 && address.length>10){
                var nameInfo= document.getElementById("nameInfo");
                var emailInfo= document.getElementById("emailInfo");
                var phoneInfo= document.getElementById("phoneInfo");
                var whatsappInfo= document.getElementById("whatsappInfo");
                var addressInfo= document.getElementById("addressInfo");

                nameInfo.value=name;
                emailInfo.value=email;
                phoneInfo.value=phone;
                whatsappInfo.value=whatsapp;
                addressInfo.value=address;

                var userDet= document.querySelector("#userDetails");
                var orderDet= document.querySelector("#orderDetails");
                var order_btn= document.querySelector("#order_btn");
                userDet.style.display="none";
                order_btn.style.display="none"
                orderDet.style.display="block";
            }
            else{
                alert("Include Valid Details")
            }
        }

    
}
    function h(){
        var orderDet= document.querySelector("#orderDetails");
        var order_btn= document.querySelector("#order_btn");
        order_btn.style.display="flex"
        orderDet.style.display="none";
    }

    return (
        <>
        <Nav></Nav>
        <CartLink></CartLink>
        <p className="message_cart">{message}</p>
        <div className="main_cart">
            <div className="cart_cards">
                {product.map((val,i)=>{
                    function al(val){
                        if(true){
                            if(val.discount){
                                cutPrice=val.price;
                                mainPrice= val.cut_price;
                                rate=val.cut_price;
                            }
                            else if(val.sell){
                                cutPrice=val.price;
                                mainPrice= val.sell_price;
                                rate=val.sell_price;
                            }
                            else{
                                cutPrice="";
                                mainPrice= val.price
                                rate=val.price;
                            }
                        }
                    };
                    al(val);
                    if(val.discount){
                        return(
                        <>
                            <div className="cart_card" key={i}>
                                <div className="can">
                                    <CloseIcon id="cart_close" onClick={()=>{cancel(val._id)}}></CloseIcon>
                                </div>
                                <a href={`/view/${val._id}`} className="cart_link">
                                <div className="cart_det">
                                    <div className="cart_img">
                                            <img src={val.main_img.link} alt="images" />
                                        </div>
                                        <div className="cart_title"> 
                                            <p>{val.title}</p>
                                            <p>Price: <span style={{color: 'black',}}>{mainPrice} <s className="cart_price">{cutPrice}</s> </span> </p>
                                        </div>
                                </div>
                                </a>
                                
                                        <div className="ex"> 
                            <p><StarIcon style={s}/><StarIcon style={s}/>DISCOUNT<StarIcon style={s}/><StarIcon style={s}/></p>
                                        </div>
                             </div>
                        </>
                    )

                    }
                    else if(val.sell){
                        return(
                            <>
                                <div className="cart_card" key={i}>
                                    <div className="can">
                                        <CloseIcon id="cart_close" onClick={()=>{cancel(val._id)}}></CloseIcon>
                                    </div>
                                    <a href={`/view/${val._id}`} className="cart_link">
                                    <div className="cart_det">
                                        <div className="cart_img">
                                                <img src={val.main_img.link} alt="images" />
                                            </div>
                                            <div className="cart_title"> 
                                                <p>{val.title}</p>
                                                <p>Price: <span style={{color: 'black',}}>{mainPrice} <s className="cart_price">{cutPrice}</s> </span> </p>
                                            </div>
                                    </div>
                                    </a>
                                    
                                    <div className="ex"> 
                            <p><StarHalfIcon style={s}/><StarHalfIcon style={s}/>SELL<StarHalfIcon style={s}/><StarHalfIcon style={s}/></p>
                                        </div>
                                 </div>
                            </>
                        )
                    }
                    else{
                        return(
                            <>
                                <div className="cart_card" key={i}>
                                    <div className="can">
                                        <CloseIcon id="cart_close" onClick={()=>{cancel(val._id)}}></CloseIcon>
                                    </div>
                                    <a href={`/view/${val._id}`} className="cart_link">
                                    <div className="cart_det">
                                        <div className="cart_img">
                                                <img src={val.main_img.link} alt="images" />
                                            </div>
                                            <div className="cart_title"> 
                                                <p>{val.title}</p>
                                                <p>Price: <span style={{color: 'black',}}>{mainPrice} <s className="cart_price">{cutPrice}</s> </span> </p>
                                            </div>
                                    </div>
                                    </a>
                                 </div>
                            </>
                        )
                    }
                        // return(
                        //     <>
                        //         <div className="cart_card" key={i}>
                        //             <div className="can">
                        //                 <CloseIcon id="cart_close" onClick={()=>{cancel(val._id)}}></CloseIcon>
                        //             </div>
                        //             <a href={`/view/${val._id}`} className="cart_link">
                        //             <div className="cart_det">
                        //                 <div className="cart_img">
                        //                         <img src={val.main_img.link} alt="images" />
                        //                     </div>
                        //                     <div className="cart_title"> 
                        //                         <p>{val.title}</p>
                        //                         <p>Price: <span style={{color: 'black',}}>{mainPrice} <s className="cart_price">{cutPrice}</s> </span> </p>
                        //                     </div>
                        //             </div>
                        //             </a>
                                    
                        //                     <div> 
                        //                         <p>HELO</p>
                        //                     </div>
                        //          </div>
                        //     </>
                        // )
                })}
            </div>
            
           
            
        </div>
        <div className="buy_btn">
                <Button id="order_btn" onClick={()=>{show()}}>BUY</Button>
         </div>
         
         <div class="userDetails" id="userDetails">
            <form>
                <h1 align="center">Add Your Details</h1>
                <CloseIcon id="close_details" onClick={()=>{hide()}}></CloseIcon>
            <TextField  id="name" required={true} style={input_style} label="Name" type="text" variant="outlined" autoComplete="off" />
            <TextField  id="email" required={true} style={input_style} label="Email" type="email" variant="outlined" autoComplete="off" />
            <TextField  id="phone" required={true} style={input_style} label="Phone No" type="tel" variant="outlined" autoComplete="off" />
            <TextField  id="whatsapp" required={true} style={input_style} label="WhatsApp No" type="tel" variant="outlined" autoComplete="off" />
            <TextField  id="address" required={true} style={input_style} label="Address" type="text" variant="outlined" autoComplete="off" />
            <div className="add_btn">
            <Button id="add_btn" onClick={()=>{det()}}>Add</Button>
            </div>
        </form>
        </div>
        
                <div className="orderDetails" id="orderDetails">
                    <form action={`/order/register/${userId}`} method="post" >
                    <div className="cart_order_head">
                            <div className="cart_total">
                            </div>  
                            <div className="cart_cancel">
                                <CloseIcon id="cancel_det" onClick={()=>{h()}}></CloseIcon>
                            </div>
                        </div>
                {product.map((val, i)=>{
                    let colors= val.colors.split(",");
                let sizes= val.sizes.split(",");
                function all(val){
                    if(true){
                        if(val.discount){
                            cutPrice=val.price;
                            mainPrice= val.cut_price;
                            rate=val.cut_price;
                        }
                        else if(val.sell){
                            cutPrice=val.price;
                            mainPrice= val.sell_price;
                            rate=val.sell_price;
                        }
                        else{
                            cutPrice="";
                            mainPrice= val.price
                            rate=val.price;
                        }
                    }
                };
                all(val);
                return(
                    <>
                    <div className="allDet">
                        <div className="title_img">
                        <div className="cart_order_img">  
                            <img src={val.main_img.link} alt="image" />
                        </div>  
                        <div className="cart_order_title">
                            <p>{val.title}</p>
                            <p>Price: <span style={{color: 'black',}}>{mainPrice} <s className="cart_price">{cutPrice}</s> </span> </p>
                        </div>
                            
                        </div>
                        <div className="cart_order_all_input">
                        <input type="hidden" name={`product${i}`} id={`product${i}`} value={val._id} />
                    <input type="hidden" name={`product${i}`} id={`product${i}`} value={val.main_img.link} />
                    <input type="hidden" name={`product${i}`} id={`product${i}`} value={val.title} />
                    <input type="hidden" name={`product${i}`} id={`product${i}`} value={mainPrice} />
                    <input type="number" name={`product${i}`} id={`product${i}`} placeholder="quantity" required="required" className="cart_order_input"/>
                    <p className="available_p">Available sizes: <span className="available">{colors.map((val, i)=>{return(val+", ")})}</span></p>
                    <input type="text" name={`product${i}`} id={`product${i}`} placeholder="colours: red, blue..." required="required" list="c" autoComplete="off" className="cart_order_input"/>
                    <datalist id="c">
                        {colors.map((val, i)=>{
                           return(
                                <>
                                    <option value={val}></option>
                                </> 
                           )
                        })}
                    </datalist>
                    <p className="available_p">Available sizes: <span className="available">{sizes.map((val, i)=>{return(val+", ")})}</span></p>
                    <input type="text" name={`product${i}`} id={`product${i}`} placeholder="size: small, medium..." required="required" autoComplete="off" list="s" className="cart_order_input"/>
                    <datalist id="s">
                        {sizes.map((val, i)=>{
                           return(
                                <>
                                    <option value={val}></option>
                                </> 
                           )
                        })}
                    </datalist>
                          
                    </div>
                </div>
                   
                    </>
                )
            })} 
                    <div className="cart_more">
                    <input type="hidden" id="nameInfo" name="name" value={name} />
                    <input type="hidden" id="emailInfo" name="email" value={email} />
                    <input type="hidden" id="phoneInfo" name="phone" value={phone} />
                    <input type="hidden" id="whatsappInfo" name="whatsapp" value={whatsapp} />
                    <input type="hidden" id="addressInfo" name="address" value={address} />
                    <input type="radio" name="paymentMethod" id="paymentMethod" className="paymentMethod" value="cash on delivery" defaultChecked readOnly required="required" />CASH ON DELIVEY <br /> 
                    <input type="text" name="message" id="message" className="message" placeholder="add your message" />
                    </div>
                    <div className="cart_btns">
                        <button type="submit">PLACE ORDER</button>
                    </div>
        </form>
        </div>
        
     <div id="snackbar"></div>
        
        </>
    )
}

export default Cart
