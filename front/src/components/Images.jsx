import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Images = (props) => {
  let images= props.data
  return (
    <>
    
    <Carousel autoPlay={false} showArrows={true} className="images_div" showThumbs={true} swipeable={true} showThumbs={false} thumbWidth={10} id="caro">
    {images.map((val, i)=>{
      return(
        <>
          <div className="image_div">
            <img src={val.link} alt="images" id="view_img"/>
          </div>
        </>
      )
    })}
    </Carousel>
      {/* <Carousel autoPlay={false} showArrows={true} >
          <div>
            <img src="../images/a.jpg" alt="images" />
            <p className="legend">1</p>
          </div>
          <div>
            <img src="../images/b.jpg" alt="images" />
            <p className="legend">2</p>
          </div>
          <div>
            <img src="../images/c.jpg" alt="images" />
            <p className="legend">3</p>
          </div>
          <div>
            <img src="../images/d.jpg" alt="images" />
            <p className="legend">4</p>
          </div>
      </Carousel> */}
    </>
  )
}

export default Images
