import React, {useState, useEffect, Component} from 'react'
import {useParams} from "react-router-dom";
import "../css/card.css";
import "../css/searchPage.css";
//IMPORTED MODULES
import Cards from "./Cards.jsx"
import Nav from "./Nav.jsx"
import SubNav from "./SubNav.jsx"
const CategoryView = () => {
    var [value, setValue]= useState("");
    var [data, setData]= useState([]);
    var {cate}= useParams();
    console.log(useParams())
    useEffect(() => {  
        setValue(cate)
            var findCate= async function(){
                try{
                    console.log(cate)
                    var res= await fetch(`/cate/${cate}`);
                    var data= await res.json();
                    console.log(data)
                    setData(data)
                    console.log(value)
                }
                catch{
    
                }
            };
            findCate();
    }, [cate])
    return (
        <>
        <Nav></Nav>
        <SubNav></SubNav>
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

export default CategoryView
