import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from "react-router-dom"
import Image from "./Images.jsx"

import "../css/view.css"
import "../css/cart.css";
import "../css/head.css"
var input_style={
    width: '100%',
    margin: 'auto, 5%',
    marginTop:'10px',
    height: 'auto'
}

var s={
    fontSize: '15px'
}
    
function show(){
    var user_div= document.querySelector("#userDetails")
    user_div.style.display="block";
}
// function hide(){
//     var user_div= document.querySelector("#userDetails");
//     var OrderBtn= document.querySelector("#order_btn");
//     OrderBtn.style.display="block"
//     user_div.style.display="none";
// }
// function det(){
//     var name= document.getElementById("name").value;
//     var email= document.getElementById("email").value;
//     var phone= document.getElementById("phone").value;
//     var whatsapp= document.getElementById("whatsapp").value;
//     var address= document.getElementById("address").value;
//     var cart_cards= document.querySelector(".cart_cards");
//     cart_cards.style.display="none";
//     var verify_email
//     if(!email.includes("@")){
//         alert("Include Valid Email")
//         verify_email= false
//     }
//     else{
//             verify_email= true
//             if(name.length>5 && verify_email && phone.length>8 && address.length>10){
//                 var nameInfo= document.getElementById("nameInfo");
//                 var emailInfo= document.getElementById("emailInfo");
//                 var phoneInfo= document.getElementById("phoneInfo");
//                 var whatsappInfo= document.getElementById("whatsappInfo");
//                 var addressInfo= document.getElementById("addressInfo");

//                 nameInfo.value=name;
//                 emailInfo.value=email;
//                 phoneInfo.value=phone;
//                 whatsappInfo.value=whatsapp;
//                 addressInfo.value=address;

//                 var userDet= document.querySelector("#userDetails");
//                 var orderDet= document.querySelector("#orderDetails");
//                 var order_btn= document.querySelector("#order_btn");
//                 userDet.style.display="none";
//                 order_btn.style.display="none"
//                 orderDet.style.display="block";
//             }
//             else{
//                 alert("Include Valid Details")
//             }
//         }

    
// }
    function h(){
        var orderDet= document.querySelector("#orderDetails");
        orderDet.style.display="none";
    }
const Heading = ({data}) => {
  var [images, setImages]= useState([])
  var [d, setD]= useState([])
  useEffect(()=>{
    setD(data)
    console.log(`D: ${d}`)
    // let img=data.images
    // console.log(img)
    // let i= img.map((val, i)=>{
    //   return({url: val.link})
    // })
    // setImages(i)
  }, [])
    var add= async function(){
        try{
            let d= await fetch(`/addtocart/${data._id}`,{
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body:""
            })
            let res= await d.json();

            if(res.status && res.type==="add"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent="Added to Cart"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
            else if(!res.statue && res.type==="added"){
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent="Already Added"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
            else{
                var x = document.getElementById("snackbar");
                console.log(x)
                x.className = "show";
                x.textContent="Login First"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
        }
        catch(e){
            console.log(e)
        }
    };
    if(data.discount){
        return(
            <> 
          <div className="detail">
              <div className="views_det">
    
                  <div className="views_title">
                    <p>{data.title}</p>
                  </div>
    
                  <div className="views_del">
                    <p>DELIVERY: delivery charges: 250rs.</p>
                  </div>
    
                  
                  <div className="views_title">
                    <p>Price: <span style={{'fontWeight': 'normal'}}>{data.cut_price}</span> <s style={{'fontWeight': 'normal', 'color': 'grey'}}>{data.price}</s> </p>             
                     </div>
    
                  <div className="views_button">
                      <button id="buy_btn" className="views_btn" onClick={()=>{show()}}>BUY</button>
                        <button id="cart_btn" className="views_btn" onClick={()=>{add()}}>CART</button>
                  </div>
    
              </div> 
          </div>   
        
    
        </>
        )
    }
    else if(data.sell){
        return(
            <> 
        
          <div className="detail">
              <div className="views_det">
    
                  <div className="views_title">
                    <p>{data.title}</p>
                  </div>
    
                  <div className="views_del">
                    <p>DELIVERY: delivery charges: 250rs.</p>
                  </div>
    
                  
                  <div className="views_title">
                    <p>Price: <span style={{'fontWeight': 'normal'}}>{data.sell_price}</span> <s style={{'fontWeight': 'normal', 'color': 'grey'}}>{data.price}</s> </p>             
                     </div>

    
                  <div className="views_button">
                      <button id="buy_btn" className="views_btn" onClick={()=>{show()}}>BUY</button>
                        <button id="cart_btn" className="views_btn" onClick={()=>{add()}}>CART</button>
                  </div>
    
              </div> 
          </div>   
        </>
        )
    }
    else{
        return (
            <> 
        
          <div className="detail">
              <div className="views_det">
    
                  <div className="views_title">
                    <p>{data.title}</p>
                  </div>
    
                  <div className="views_del">
                    <p>DELIVERY: delivery charges: 250rs.</p>
                  </div>
    
                  
                  <div className="views_title">
                    <p>Price: <span style={{'fontWeight': 'normal'}}>{data.price}</span></p>             
                     </div>
    
                  <div className="views_button">
                      <button id="buy_btn" className="views_btn" onClick={()=>{show()}}>BUY</button>
                        <button id="cart_btn" className="views_btn" onClick={()=>{add()}}>CART</button>
                  </div>
    
              </div> 
          </div>   
        </>
  
  )

    }
}

export default Heading
