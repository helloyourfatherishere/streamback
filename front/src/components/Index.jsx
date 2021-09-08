import  {useState,useEffect, Component} from "react";
import "../css/card.css";
import "../css/poster.css"
import Nav from "./Nav"
import Cards from "../components/Cards.jsx"
const Index= function(){
    var [pants, setPants]= useState([]);
    var [shirts, setShirts]= useState([]);
    var [tShirts, setTshirts]= useState([]);
    var [jackets, setJackets]= useState([]);
    var [hoodies, setHoodies]= useState([]);
    var [trouser, setTrouser]= useState([]);
    var [shalwarKameez, setShalwarKameez]= useState([]);
    var [kurti, setKurti]= useState([]);
    var [collections, setCollections]= useState([]);
    var [undergarments, setUndergarments]= useState([]);
    var [poster, setPoster] = useState([]);
    var p= function(){
        var slideIndex = 0;
        showSlides();

        function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 2500); // Change image every 2 seconds
}
    }
    useEffect(()=>{
        var f= async function(){
            try{
                var res= await fetch("/api");
                var d= await res.text();
                var a= JSON.parse(d); 
                setPants(a[0])
                setShirts(a[1])
                setTshirts(a[2])
                setJackets(a[3])
                setHoodies(a[4])
                setTrouser(a[5])
                setShalwarKameez(a[6])
                setKurti(a[7])
                setCollections(a[8])
                setUndergarments(a[9])
                setPoster(a[10])
                p();
            }catch(e){
                console.log(e)
            }
        };f();
    }, [])
    return(
        <> 
        <Nav key="1"></Nav>
        <div className="slideshow-container">
    {poster.map((val,i)=>{
        return(
            <div className="mySlides fade">
            <img src={val.link} className="poster_img" alt="poster"/>
            </div>
        )
    })}



</div>
<br/>
        <div className="card_div">
        <div className="parent_card">
            <div className="heading">
                <h1 className="heading_h1">Pants:</h1>
            </div>
            <div className="card">
            {pants.map((val,i)=>{
                    <Cards key={i} pants={val}/>
                })}
                </div>
                <div className="more">
                    <a href="/category/pants">more..</a>
                </div>
                
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Shirts:</h1>
            </div>
            <div className="card">
            {shirts.map((val,i)=>{
                    return(
                    <>
                    <a href={`/view/${val._id}`} className="link">
                    <div key={i} className="cards">
                        <div className="img_div">
                             <img src={val.main_img.link} alt="images" />
                    </div>
                    <div className="title">
                        <p>{val.title}</p>
                        </div>
                    </div>  
                    </a>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/shirts">more..</a>
                </div>
                
        </div>
        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">T-Shirts:</h1>
            </div>
            <div className="card">
            {tShirts.map((val,i)=>{
                    return(
                    <>
                    <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/t-shirts">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Jackets:</h1>
            </div>
            <div className="card">
            {jackets.map((val,i)=>{
                    return(
                    <>
                    <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/jackets">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Hoodies:</h1>
            </div>
            <div className="card">
            {hoodies.map((val,i)=>{
                    return(
                    <>
                      <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/hoodie">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Trousers:</h1>
            </div>
            <div className="card">
            {trouser.map((val,i)=>{
                    return(
                    <>
                    <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/trouser">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Shalwar kameez:</h1>
            </div>
            <div className="card">
            {shalwarKameez.map((val,i)=>{
                    return(
                    <>
                   <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/shalwar-kameez">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Ladies Kurti:</h1>
            </div>
            <div className="card">
            {kurti.map((val,i)=>{
                    return(
                    <>
                   <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/kurti">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Collections:</h1>
            </div>
            <div className="card">
            {collections.map((val,i)=>{
                    return(
                    <>
                   <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/collection">more..</a>
                </div>
                 
        </div>

        <div className="parent_card">
            <div className="heading">
            <h1 className="heading_h1">Undergarmens:</h1>
            </div>
            <div className="card">
            {undergarments.map((val,i)=>{
                    return(
                    <>
                   <Cards key={i} data={val}/>
                    </>)
                })}
                </div>
                <div className="more">
                <a href="/category/undergarment">more..</a>
                </div>
                 
        </div>

     </div>
     
     <div id="snackbar">logged out</div>
        </>
    )
};
export default Index;