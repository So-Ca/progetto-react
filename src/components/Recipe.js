import React from 'react';
import {Link} from "react-router-dom";
import style from "../style/recipe.module.css";
import dairy from "../assets/images/icons/dairyFree.png";
import gluten from "../assets/images/icons/glutenFree.png";
import healthy from "../assets/images/icons/healthy.png";
import veg from "../assets/images/icons/vegan.png";
import veggy from "../assets/images/icons/vegetarian.png";

function Recipe({props}) {
  const { id, image, dairyFree, glutenFree, vegan, vegetarian, veryHealthy} = props;
  let { title } = props;
  const titleMaxLength = 20;
  title = title.length > titleMaxLength ? `${title.substring(0, titleMaxLength)}...` : title;
  
  return (
    <div className={style["recipe-preview"]}>
      <h1 className={style["recipe-name"]}>{title}</h1>
      <img className={style["recipe-img"]} src={image} alt="recipe image"/>
      <Link className={style.link} to={`/recipe/${id}`} target="_blank" rel="noopener noreferrer">Click here for more information</Link>
      <div className={style["icons-container"]}>
        {dairyFree && <img className={style["icon"]} src={dairy} alt="dairy free icon"/>}
        {glutenFree && <img className={style["icon"]} src={gluten} alt="gluten free icon"/>}
        {vegan && <img className={style["icon"]} src={veg} alt="vegan icon"/>}
        {vegetarian && <img className={style["icon"]} src={veggy} alt="vegetarian icon"/>}
        {veryHealthy && <img className={style["icon"]} src={healthy} alt="healthy icon"/>}
      </div>
    </div>
  )
}

export default Recipe