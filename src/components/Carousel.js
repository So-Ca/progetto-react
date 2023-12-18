import React, { useState, useEffect } from 'react';
import style from "../style/carousel.module.css";


function Carousel({images}) {

  const [index, setIndex] = useState(0);

// change slide
  function changeSlide(step){
    const slider = document.getElementById("slider");
    const newPosition = -index * 800 + "px";
    setIndex( (prevIndex) => (prevIndex + step + images.length) % images.length);
    slider.style.left = newPosition;
  }
  
// change slide every 5s
  function autoChangeSlide(){
    const slider = document.getElementById("slider");
    setIndex( (prevIndex) => (prevIndex + 1) % images.length);
    const newPosition = -index * 800 + "px";
    slider.style.left = newPosition;
  }
  
  useEffect( () => {
    const intervalId = setInterval(autoChangeSlide, 5000);
    return () => clearInterval(intervalId);
  }, [index, autoChangeSlide]);

  return (
    <div className={style["carousel"]}>
      <div className={style["image-container"]} id="slider">
        {images.map( (image, i) => (
          <img key={i} src={image} className={style["slider-image"]}/>
        ))}
      </div>
      <div className={style["button-container"]}>
        <div className={`${style["change-slide-btn"]} ${style["right"]}`} onClick={()=> changeSlide(-1)}></div>
        <div className={`${style["change-slide-btn"]} ${style["left"]}`} onClick={()=> changeSlide(1)}></div>
      </div>
    </div>
  )
}

export default Carousel