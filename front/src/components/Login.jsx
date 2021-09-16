import React, {useState, useEffect}from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../css/login.css"
import { NavLink , useHistory, useParams} from 'react-router-dom';
var input_style={
    width: '100%',
    margin: 'auto, 5%',
    marginTop:'10px',
    height: 'auto'
}

const Login = () => {
    var history= useHistory();
    function Login(){
        let email= document.querySelector("#email").value;
        let pass= document.querySelector("#pass").value;
        let verify_email;
        let verify_pass;
        if(email.includes("@")){
            verify_email= true;
        }
        else{
            verify_email= false;
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.textContent="enter correct email"
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        if(pass.length>5){
            verify_pass= true;
        }
        else{
            verify_pass= false;
        }
        if(verify_email && verify_pass){
            var find_user= async function(){
                try{
                    var data= await fetch("/signin",{
                        method: 'POST',
                        headers:{"Content-Type": "application/json"},
                        body:JSON.stringify({email, pass})
                    });
                    var res= await data.json();
                    if(res){
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        x.textContent="login succesfully"
                        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                        setTimeout(function(){history.push("/")}, 2000)
                    }
                    else{
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        x.textContent="email or password is incorrect"
                        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    }
                }
                catch(e){                
                        console.log(e)
                }
            };
            find_user();
        }
        else{
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.textContent="email or password is incorrect"
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    }
    return (
        <>
            <div className="main_login">
                <div className="login_head">
                    <p className="login_heading">Login</p>
                    <p>you must have to <b>Login </b>first</p>
                </div>
                <div className="form_login">
                    <div className="form_div_login">
                        <form action="#">
                        <TextField  className="login_input" id="email" required={true} style={input_style} label="Email" type="email" variant="outlined" name="email" autoComplete="off" />
                        <TextField  className="login_input" id="pass" required={true} style={input_style} label="Password" type="password" variant="outlined" name="pass" autoComplete="off" />
                        </form>
                    </div>
                    <div className="login_links">
                        <NavLink exact to="/forgot/pass">forgot password?</NavLink>
                        <NavLink exact to="/create-account">Create Account</NavLink>
                    </div>
                    <div className="login_btn">    
                        <Button variant="contained" color="primary" id="submit_btn" onClick={()=>{Login()}}>Login</Button>
                    </div>
                </div>
            </div>
            
            <div id="snackbar">logged out</div>
        </>
    )
}

export default Login
