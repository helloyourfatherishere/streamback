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

var history;
const Forgot = () => {
    history= useHistory();
    var {cate} = useParams();
    let [place, setPlace]= useState("");
    let [heading, setHeading]= useState("");
    let [message, setMessage]= useState("");
    let [id, setId]= useState("");
    let [resetPlace, setResetPlace]= useState("");
    let [resetId, setResetId]= useState("");
    let email;
    var check= function(){
        email= document.querySelector("#email").value;
        let changeData= document.querySelector("#change_data").value;
        let verify_email;
        if(email.includes("@")){
            verify_email= true;
        }
        else{
            verify_email= false;
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.textContent=`enter correct email`
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        if(verify_email){
            var signin= async function(){
                try{
                    var data= await fetch(`/forgot/${cate}`,{
                        method: 'POST',
                        headers:{"Content-Type": "application/json"},
                        body:JSON.stringify({email, changeData})
                    });
                    var res= await data.json();
                    if(!res){
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        x.textContent=`email or ${place} is incorrect`
                        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    }
                    else{
                        var check_form= document.querySelector("#check_form");
                        var reset_form= document.querySelector("#reset_form");
                        check_form.style.display="none";
                        reset_form.style.display="block";
                    }
                }
                catch(e){
                }
            };
            signin();
        }
        else{
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.textContent=`email or ${place} is incorrect`
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    };
    var reset= async function(){
        try{
            var changedData= document.querySelector("#changedData").value;
            if(cate==="pass"){
                if(changedData.length>=8){
                    let resetData= await fetch(`/change/${cate}/${email}`,{
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({changedData})
                    });
                    let result=await resetData.json();
                    if(result){
                        history.push("/")
                    }
                }
                else{
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    x.textContent=`password must be greater than 8`
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                }
            }
            else{
                if(changedData.length===4){
                    let resetData= await fetch(`/change/${cate}/${email}` ,{
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({changedData})
                    });
                    let result= await resetData.json();
                    if(result){
                        history.push("/")
                    }
                }
                else{
                    alert(`length of security code must be greater than 4`)
                }
            }
        }
        catch(e){
            console.log(e)
        }
    };
    useEffect(()=>{
        var verify= async function(){
            try{
                let verify_user_login= await fetch("/verify_user");
                let res_verify_user= await verify_user_login.json();
                let verifyUser=res_verify_user.verify_user
                if(cate==="pass"){
                    setPlace("Security Code")
                    setHeading("Reset Password")
                    setMessage("Add your Email And Security Code to reset your password")
                    setId("security_code");
                    setResetPlace("add new password")
                    setResetId("changedData")
                }
                else{
                    setPlace("Password")
                    setHeading("Reset Security Code")
                    setMessage("Add your Email And Password to reset your Security Code")
                    setId("pass")
                    setResetPlace("add new security code")
                    setResetId("changedData")
                }
              
            }
            catch(e){
                console.log(e)
            }
        };
        verify();       
    },[])
    return (
        <>
        <div className="main_login" id="check_form">
                <div className="login_head">
                    <p className="login_heading">{heading}</p>
                    <p>{message}</p>
                </div>
                <div className="form_login" >
                    <div className="form_div_login">
                        <form>
                        <TextField  id="email" required="true" style={input_style} label="Email" type="email" variant="outlined" name="email" autoComplete="off" />
                        <TextField  id="change_data" required="true" style={input_style} label={place} type="password" variant="outlined" name={id} autoComplete="off" />
                        </form>
                    </div>
                    <div className="login_links">
                        <NavLink exact to="/login">login</NavLink>
                        <NavLink exact to="/create-account">Create Account</NavLink>
                    </div>
                    <div className="login_btn">    
                        <Button variant="contained" color="primary" id="submit_btn" type="submit"  onClick={()=>{check()}} >Check</Button>
                    </div>
                </div>
            </div>

            <div className="main_login" id="reset_form">
                <div className="login_head">
                    <p className="login_heading">{heading}</p>
                    <p>{message}</p>
                </div>
                <div className="form_login" >
                    <div className="form_div_login">
                        <form>
                        <TextField  id={resetId} required="true" style={input_style} label={resetPlace} type="email" variant="outlined" name="email" autoComplete="off" />
                        </form>
                    </div>
                    <div className="login_btn">    
                        <Button variant="contained" color="primary" id="submit_btn" type="submit" onClick={()=>{reset()}}>Change</Button>
                    </div>
                </div>
                </div>
                
            <div id="snackbar">logged out</div>
        </>
    )
}

export default Forgot
