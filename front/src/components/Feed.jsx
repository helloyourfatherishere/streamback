import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../css/login.css"

var input_style={
    width: '100%',
    margin: 'auto, 5%',
    marginTop:'10px',
    height: 'auto',
    wordWrap: 'break-word',
    textAlign: 'start',
}
const Feed = () => {
    let {sub}= useParams();
    var history= useHistory();
    let [head, setHead]= useState();
    let [mess, setMess]= useState();
    useEffect(()=>{
        if(sub==="feedback" || sub==="contact"){
            if(sub==="feedback"){
                setHead('Send your feedback')
                setMess("Thanks for your feedback")
            }
            else{
                setHead('Contact Us')
                setMess("We will soon contact you")
            }
        }
        else{
        }
    }, []);
    var send= function(){
            var email= document.querySelector("#email").value;
            var message= document.querySelector("#message").value;
            let verify_email;
            let verify_message;
            if(email.includes("@")){
                verify_email= true
            }
            else{
                verify_email= false
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent="put correct email"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
            if(message.length> 10){
                verify_message= true
            }
            else{
                verify_message= false
                var x = document.getElementById("snackbar");
                x.className = "show";
                x.textContent="length of message must be greater than 10"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
            if(verify_email && verify_message){
                let e= email;
                let m= message
                var sendMessage= async function(){
                    try{
                        let data=await  fetch(`/feed/${sub}`,{
                            method: 'POST',
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({email : e, message: m})
                        });
                        let res= await data.json();
                        if(res){
                            var email= document.querySelector("#email").value;
                            var message= document.querySelector("#message").value;
                            if(sub==="feedback"){
                                var x = document.getElementById("snackbar");
                                x.className = "show";
                                x.textContent="Thank You for your feedback"
                                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                                setTimeout(()=>{history.push("/")}, 1500)
                            }
                            else{
                                var x = document.getElementById("snackbar");
                                x.className = "show";
                                x.textContent="Thank You to Contact Us, We will soon reply to you"
                                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                                setTimeout(()=>{history.push("/")}, 1500)
                            }
                        }   
                    }
                    catch(e){
                        console.log(e)
                    }
                };
                sendMessage();
            }
        
    }
    return (
        <> <div className="main_login">
        <div className="login_head">
            <p className="login_heading">{head}</p>
            <p>{mess}</p>
        </div>
        <div className="form_login">
            <div className="form_div_login">
                <form action="#">
                <TextField  id="email" required="true" style={input_style} label="Email" type="email" variant="outlined" name="email" autoComplete="off" />
                <TextField  id="message" required="true" style={input_style} label="Message" type="text" variant="outlined" name="pass" autoComplete="off" />
                </form>
            </div>
            <div className="login_btn">    
                <Button variant="contained" color="primary" id="submit_btn" onClick={()=>{send()}}>Submit</Button>
            </div>
        </div>
    </div>
    
    <div id="snackbar"></div>
        </>
    )
}

export default Feed
