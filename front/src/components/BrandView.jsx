import React,{useState, useEffect, Component} from 'react'
import {useParams} from "react-router-dom";
import "../css/card.css";
import "../css/searchPage.css";
//IMPORTED MODULES
import Cards from "./Cards.jsx"
import Nav from "./Nav.jsx"
import BrandNav from "./BrandNav.jsx"

const BrandView = () => {  
    var [value, setValue]= useState("");
    var [data, setData]= useState([]);
    var {brand_name}= useParams();
    useEffect(() => {  
        setValue(brand_name)
            var findCate= async function(){
                try{
                    var res= await fetch(`/b/${brand_name}`);
                    var data= await res.json();
                    setData(data)
                }
                catch{

                }
            };
            findCate();
    }, [brand_name])
    return (
        <>
        <Nav></Nav>
        <BrandNav></BrandNav>
        <div className="info">
        <p><span class="first_letter">f</span>ound <span class="first_letter">r</span>esults <span class="first_letter">f</span>or: <span class="search_value">{value}</span></p>
            </div>
            <div className="card_div">
                 <div className="card">
                 {data.map((val,i)=>{
                        return(
                            <Cards key={i} data={val}/>
                        )
                    })}
                    </div>
                    
            </div>
        </>
    )
}

export default BrandView
