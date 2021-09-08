import React,{useState, useEffect, Component} from 'react'
import "../css/category.css"
import DragHandleOutlinedIcon from '@material-ui/icons/DragHandleOutlined';
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const CategoryList = () => {
  let [category, setCategory]= useState([]);
  let [brand, setBrand]= useState([]);
  useEffect(()=>{
    var findMain= async function(){
      try{
        let data= await fetch("/main",{
          method: "post",
        });
        let res= await data.json();
        setCategory(res.main_data.cate[0].split(','))
        setBrand(res.main_data.brand[0].split(","))
      }
      catch(e){
      }
    };
    findMain();
  },[])
    return (
        <>
        
        <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0);" class="close_btn" id="close_btn" onclick="closeNav()">&times;</a>
            <ul class="nav_ul">
                {category.map((val, i)=>{
                    return(
                      <a href={`/category/${val}`} className="category_options"><li><DragHandleOutlinedIcon /> {val} </li></a>
                    )
                 })}

                <li className="brand"><DragHandleOutlinedIcon /> Brands<span className="brands_more_arrow"><ArrowRightIcon /></span> <span className="brands_more_arrow_down"><ArrowDropDownIcon /></span>
                  <ul class="sub_ul">
                  {brand.map((val, i)=>{
                    return(
                      <a href={`/brand/${val}`}><li><ClearAllOutlinedIcon />{val}</li></a>
                    )
                 })}
                  </ul>
                </li>
            </ul>
      </div>
        </>
    )
}

export default CategoryList
