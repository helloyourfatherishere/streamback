import React,{useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import "../css/card.css";
import "../css/searchPage.css";
//IMPORTED MODULES
import Cards from "./Cards.jsx"
import Nav from "./Nav.jsx"
import SubNav from "./SubNav.jsx"
const Search = () => {
    var [searchValue, setSearchValue]= useState("");
    var [local, setLocal]= useState([]);
    var [brand, setBrand]= useState([]);
    var history= useHistory();
    useEffect(() => {
        var Find= async function(){
            try{
                var v= history.location.search;
                var val= v.split("=")[1].replace("%27s", "'s");
                var s= val.split("+");
                var values= s.join(" ")
                var value= JSON.stringify(values)
                setSearchValue(value)
                var res= await fetch("/searched", {
                    method: "POST", 
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({values})
                });
                var data= await res.json();
                setLocal(data.findLocal);
                setBrand(data.findBrand)
            }
            catch{

            }
        };
        Find();
    }, [])
    return (
        <>
        <Nav></Nav>
        <SubNav></SubNav>
        <div className="info">
                <p><span class="first_letter">f</span>ound <span class="first_letter">r</span>esults <span class="first_letter">f</span>or: <span class="search_value">{searchValue}</span></p>
            </div>
            <div className="card_div">
                 <div className="card">
                {local.map((val,i)=>{
                        return(
                            <Cards key={i} data={val}/>
                        )
                    })}
                    </div>
                    
            </div>
        </>
    )
}

export default Search
