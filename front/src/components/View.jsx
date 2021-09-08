import React, {useState, useEffect, Component} from 'react'
import {useParams, useHistory} from "react-router-dom"
import "../css/view.css"
import Cards from "./Cards.jsx"
import Nav from "./Nav.jsx"
import Heading from './Heading'
import Images from './Images'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Error from "./Error.jsx"
import "../css/cart.css";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';


var input_style={
    width: '100%',
    margin: 'auto, 5%',
    marginTop:'10px',
    height: 'auto'
}

var s={
    fontSize: '15px'
}
var last;
function hide(){
    var user_div= document.querySelector("#userDetails")
    user_div.style.display="none";
}
function det(){
    var name= document.getElementById("name").value;
    var email= document.getElementById("email").value;
    var phone= document.getElementById("phone").value;
    var whatsapp= document.getElementById("whatsapp").value;
    var address= document.getElementById("address").value;

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
                var orderDet= document.querySelector("#orderDetails")
                userDet.style.display="none";
                orderDet.style.display="block";
            }
            else{
                alert("Include Valid Details")
            }
        }

    
}
    
function h(){
        var orderDet= document.querySelector("#orderDetails");
        orderDet.style.display="none";
    }
async function place(e){
    try{
    e.preventDefault()
    let id= e.target[0].value
    let img= e.target[1].value
    let title= e.target[2].value
    let price= e.target[3].value
    let quantity= e.target[4].value
    let colors= e.target[5].value
    let sizes= e.target[6].value
    let name= e.target[7].value
    let email= e.target[8].value
    let phone= e.target[9].value
    let whatsapp= e.target[10].value
    let address= e.target[11].value
    let paymentMethod= e.target[12].value
    let message= e.target[13].value

    let orderDiv= document.getElementById("orderDetails");
    orderDiv.style.display="none"
    let o= await fetch("/order/unregistered",{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({paymentMethod, id, price, img, title, quantity, colors, sizes, message, name, email, phone, whatsapp, address}) 

    })
    let r= await o.json();
    console.log(r)
    if(r){

        var x = document.getElementById("snackbar");
        x.className = "show";
        x.textContent="Order Placed"
        x.style.display="block"
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    else{

        var x = document.getElementById("snackbar");
        x.className = "show";
        x.textContent="Order Placed"
        x.style.display="block"
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    }
    catch(err){
    }
}
const View = () => {
    var {id}= useParams();
    var [data, setData]= useState([]);
    var [more, setMore]= useState([]);
    var [images ,setImages]= useState([])
    var [table ,setTable]= useState([])
    var [comments ,setComments]= useState([])
    var [d ,setD]= useState([])
    var [comm ,setComm]= useState("")
    var [find ,setFind]= useState(null)
    
    var cutPrice;
    var mainPrice;
    var rate;
    var name;
    var email;
    var phone;
    var whatsapp;
    var address;


 var sub = async function(){
        try{
            let com= document.getElementById("comment")
            let comment= com.value
            let d= await fetch(`/comment/${id}`,{
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({comment: com.value}) 

            })
            let r= await d.json();
            if(r){
                com.value=""
                setComm(comment)
            }
            else{
                com.value=""
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent="login first"
                x.style.display="block"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

            }
        }
        catch(e){
    }
} 
    useEffect(()=>{
        var findData= async function(){
            try{
                let data= await fetch(`/views/${id}`)
                let res= await data.json();
                console.log(res)
                setFind(res.find)
                if(res.find){
                    setData(res.data)
                    setImages(res.data.images)
                    setMore(res.more)
                    var tab=res.data.table.split(";")
                    setTable(tab);
                    setComments(res.data.comments)
                    setD([res.data])

                }
                else{
                    setData({})
                    setMore([])
                    setImages([])
                    setTable("");
                    setComments([])
                    setD([{}])
                    setFind(false)

                }

            }
            catch(e){
            }
        };
        findData();
        
    }, [comm]);
     
    if(find){
        return (
            <>
            <Nav></Nav>
            <div className="view_main">
                    {/* HEADING IMAGES */}
                    <div className="view_img">
                        <div className="main_view">
                            <div className="view_imgs">
                                <div className="container">
                                    <Images data={images}></Images>
                                </div>
                                <Heading data={data}></Heading>
                            </div>
                        </div>
                    </div>
                    
                    {/* DESCRIPTIONS AND NOTICE */}
                    <div className="view_des">
    
                        <div className="view_description">
    
                            <div className="descript">
                                <p><b>Description:</b> {data.des}</p>
                            </div><br />
    
                            <div className="view_note">
                                <p><b>Notice:</b> {data.note}</p>
                            </div>
    
                        </div>
    
                            {/* TABLE */}
                        <div className="view_table">
    
                            <table border="1" className="table">
                                <tbody>
                                    {table.map((val, i)=>{
                                        var v= val.split(":")
                                        return(
                                            <tr>
                                                <td>{v[0]}</td>
                                                <td>{v[1]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
    
                        </div>
                    </div>
                    
                    {/* MORE CARDS */}
                    <div className="view_more">
    
                        <div className="view_more_head">
                                <p>Suggested For You:</p>
                        </div>
    
                        <div className="view_more_card">
                            {more.map((val, i)=>{
                                return(
                                    <>
                                    <Cards data={val}></Cards>
                                    </>
                                )
                            })}
                        </div>
    
                    </div>
                    
                    {/* COMMENT INPUT */}
                    <div className="comment_div">
                            <form action={`/comment/${id}`} method="post" id="view_form" onSubmit={(e)=>{e.preventDefault()}}>
                                <div className="view_textarea">
                                <textarea type="text" name="comment" required={true} placeholder="comment here..." id="comment" style={{"resize": "none"}}></textarea>
                                </div>
                                <div className="view_btn">
                                <button type="submit" onClick={sub}>Comment</button>
                                </div>
                            </form>
                    </div>
                
                {/* COMMENTS */}
                <div className="comments_div">
                        <div className="comm_head">
                            <p>Comments:</p>
                        </div>
                            
                        <div className="comm_div">
                            {comments.map((val, i)=>{
                                        return(
                                            <>
                                            <fieldset className="fieldset">
                                                <legend className="legend"><CheckCircleOutlineIcon className="check" style={{'fontSize': '10px'}}/>verified</legend>
                                                <div className="comms">
                                                <p><b style={{'textTransform': 'capitalize'}}>{val.name}: </b>{val.comment}</p>
                                                </div>
                                            </fieldset>
                                            </>
                                        )
                                    })}
                        </div>
                </div>
                <div id="snackbar"></div>
                
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
                        <form action={"/order/unregistered"} method="post" onSubmit={place}>
                        <div className="cart_order_head">
                                <div className="cart_total">
                                </div>  
                                <div className="cart_cancel">
                                    <CloseIcon id="cancel_det" onClick={()=>{h()}}></CloseIcon>
                                </div>
                            </div>
                    {d.map((val, i)=>{
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
                            <input type="hidden" name="id" id={`product${i}`} value={val._id} />
                        <input type="hidden" name="img" id={`product${i}`} value={val.main_img.link} />
                        <input type="hidden" name="title" id={`product${i}`} value={val.title} />
                        <input type="hidden" name="price" id={`product${i}`} value={mainPrice} />
                        <input type="number" name="quantity" id={`product${i}`} placeholder="quantity" required="required" className="cart_order_input"/>
                        <p className="available_p">Available sizes: <span className="available">{colors.map((val, i)=>{return(val+", ")})}</span></p>
                        <input type="text" name="colors" id={`product${i}`} placeholder="colours: red, blue..." required="required" list="c" autoComplete="off" className="cart_order_input"/>
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
                        <input type="text" name="sizes" id={`product${i}`} placeholder="size: small, medium..." required="required" autoComplete="off" list="s" className="cart_order_input"/>
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
                            <button type="submit" >PLACE ORDER</button>
                        </div>
            </form>
            </div>
            
    
            </div>
            </>
        )
    }
    else{
        return(
            <>
        <Error message="you have just entered an invalid url.. or this product may be temporarily unavailable" valid={true}></Error>
        </>
        )
    }
    
}
    

 export default View