import React,{useEffect,Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../css/createaccount.css";
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        margin: theme.spacing(1),
      },
    },
  }));

var input_style={
    width: '100%',
    margin: 'auto, 5%',
    marginTop:'10px',
    height: 'auto'
}

const CreateAccount = () => {
  var history= useHistory();
    const classes = useStyles();
    var sub = function(){
      let email= document.querySelector("#email").value;
      let pass= document.querySelector("#pass").value;
      let name= document.querySelector("#name").value;
      let contact_email= document.querySelector("#contact_email").value;
      let phone= document.querySelector("#phone").value;
      let address= document.querySelector("#address").value;
      let security_code= document.querySelector("#security_code").value;
      let verify_email;
      let verify_pass;
      let verify_security_code;
      if(email.includes("@")){
        verify_email= true
      }
      else if (!email.includes("@")){
        verify_email= false
        alert("add your email correctly")
      }
      if(pass.length>=8){
        verify_pass= true
      }
      else{
        verify_pass= false;
        alert("length of password must be greater than 8")
      }
      if(security_code.length==4){
        verify_security_code= true
      }
      else{
        verify_security_code= false;
        alert("length of security code must be 4")
      }
      if(verify_email && verify_pass && verify_security_code){
          var signup= async function(){
            try{
              var data= await fetch("/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, pass, name, contact_email, phone, address, security_code})
              });
              let res= await data.json();
              if(res){
                history.push("/login")
              }
              else{
                alert(`an account with this ${email} already exists`)
              }
            }catch(e){
            console.log(e)
            }
          };
          signup();
      }
    } 
    return (
        <>
        <div className="main">
        <div className="heading_div">
                <p>Create Account</p>
            </div>
            <div className="form_div">
            <form className={classes.root} id="form_div" noValidate autoComplete="off" method="post" action="/abc">
                <div id="sec1">
                <TextField className="account_input"  id="email" required="true" style={input_style} label="Email" type="email" variant="outlined" name="email" autoComplete="off" />
                <TextField className="account_input"  id="pass" required="true" style={input_style} label="Password" type="password" variant="outlined" name="pass" autoComplete="off" />
                <div className="sub_link">
                  <NavLink exact to="/login">login</NavLink>
                </div>
                </div>
                
                <div id="sec2">
                <TextField className="account_input" id="name" required="true" style={input_style} label="Name"type="text" variant="outlined" name="name" autoComplete="off" />
                <TextField className="account_input" id="contact_email" required="true" style={input_style} label="Contact Email" type="email" variant="outlined" name="contact_email" autoComplete="off" />
                <TextField className="account_input" id="phone" required="true" style={input_style} label="Phone No" type="tel" variant="outlined" name="phone"/>
                <TextField className="account_input" id="address" required="true" style={input_style} label="Address" type="text" variant="outlined" name="address" autoComplete="off" />
                <TextField className="account_input" id="security_code" required="true" style={input_style} label="Security Key" type="password" variant="outlined" name="securoty_code" autoComplete="off" />
                <div className="sub_link">
                <Button variant="contained" color="primary" id="submit_btn" onClick={()=>{sub()}}>Submit</Button>
                </div>
                </div>
            </form>
            </div>
        </div>
           
            
        </>
    )
}

export default CreateAccount
