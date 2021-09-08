import React,{useEffect, Component} from 'react'
import "../css/snackBar.css"
const SnackBar = ({message}) => {
      useEffect(()=>{
          
        function myFunction() {
            var x = document.getElementById("snackbar");
            console.log(x)
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        myFunction()
      }, [])
    return (
        <>      
            <div id="snackbar">{message}</div>
        </>
    )
}

export default SnackBar
