import React, {useState, useEffect} from 'react'
import "../css/subnav.css"
const BrandNav = () => {
    let [data, setData]= useState([]);
    let [cate, setCate]= useState([]);
    useEffect(()=>{
        let find = async function(){
            try{
                let data= await fetch("/main",{
                    method: 'POST',
                    headers:{"Content-Type": "application/json"},
                    body: ""
                });
                let res= await data.json()
                let c= res.main_data.brand[0].split(",")
                setData(res.main_data)
                setCate(c)
            }
            catch(e){
            }
        };
        find();
    }, [])
    return (
        <>
            <div className="items">
               {cate.map((val, i)=>{
                   return(
                       <>
                       <div className="item">
                           <a href={`/brand/${val}`}>{val}</a>
                       </div>
                       </>
                   )
               })}
            </div>

            
            <div className="cate_pc">
                <p>Brands:</p>
            <div className="vertical_items">
            {cate.map((val, i)=>{
                   return(
                       <>
                       <div className="vertical_item">
                           <a href={`/category/${val}`}>{val}</a>
                       </div>
                       </>
                   )
               })}
               
            </div>
            </div>
        </>
    )
}

export default BrandNav
