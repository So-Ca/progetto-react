import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import veg from "../assets/images/icons/vegan.png";
import veggy from "../assets/images/icons/vegetarian.png";
import dairy from "../assets/images/icons/dairyFree.png";
import gluten from "../assets/images/icons/glutenFree.png";
import healthy from "../assets/images/icons/healthy.png";
import errorIcon from "../assets/images/icons/error-icon.png";
import style from "../style/recipesDetails.module.css";

function RecipesDetails(){
  const {id} = useParams();
  const [recipeDetails, setRecipeDetail] = useState(null);
  const [error, setError] = useState(null);

// request filtered by id
  async function fetchDetails() {
    try {
      const apiKey = "ae960525345346719ea2b99447dd03a3";
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
      const data = await response.data;
      setRecipeDetail(data);
      console.log("This is selected recipe:", data);
    } catch(error) {
      console.error("Ops, there has been an error: ", error);
      setError(error);
    }
  }

  useEffect( ()=> { fetchDetails() }, [id]);

  return(
    <div className={style["page"]}>
      {recipeDetails ? (
        <div>
          <h1 className={style["recipe-name"]}>{recipeDetails.title}</h1>
          <div>
            <div className={style["img-info-container"]}>
              <img className={style["recipe-img"]} src={recipeDetails.image} alt="Recipe Image"/>
              <div className={style["info-container"]}>
                <p>Preparation Time: {recipeDetails.readyInMinutes}</p>
                <p>Servings: {recipeDetails.servings}</p>
                <ul className={style["food-type"]}>
                  {recipeDetails.vegan && (
                    <div className={style["li-container"]}>
                      <li>Vegan</li>
                      <img className={style["icon"]} src={veg} alt="Vegan Icon"/>
                    </div>
                  )}
                  {recipeDetails.vegetarian && (
                    <div className={style["li-container"]}>
                      <li>Vegetarian</li>
                      <img className={style["icon"]} src={veggy} alt="Vegetarian Icon"/>
                    </div>
                  )}
                  {recipeDetails.glutenFree && (
                    <div className={style["li-container"]}>
                      <li>Gluten Free</li>
                      <img className={style["icon"]} src={gluten} alt="Gluten Free Icon"/>
                    </div>
                  )}
                  {recipeDetails.dairyFree && (
                    <div className={style["li-container"]}>
                      <li>Dairy Free</li>
                      <img className={style["icon"]} src={dairy} alt="Dairy Free Icon"/>
                    </div>
                  )}
                  {recipeDetails.veryHealthy && (
                    <div className={style["li-container"]}>
                      <li>Very Healthy</li>
                      <img className={style["icon"]} src={healthy} alt="Very Healthy Icon"/>
                    </div>
                  )}
                </ul>
                <p><b>Dish Type:</b> {recipeDetails.dishTypes && recipeDetails.dishTypes.length > 0 ? recipeDetails.dishTypes[0] : "N/A"}</p>
                {console.log("DEBUGGING", recipeDetails.nutrition)}
                {recipeDetails && recipeDetails.nutrition && recipeDetails.nutrition.caloricBreakdown ? (
                  <ul>Nutritional Value:
                    <li>Carbs: {recipeDetails.nutrition.caloricBreakdown.percentCarbs}%</li>
                    <li>Proteins: {recipeDetails.nutrition.caloricBreakdown.percentProtein}%</li>
                    <li>Fats: {recipeDetails.nutrition.caloricBreakdown.percentFat}%</li>
                  </ul>
                ) : "" }
              </div>
            </div>
            <div className={style["summary-container"]}>
              <p className={style["recipe-summary"]}>{new DOMParser().parseFromString(recipeDetails.summary, "text/html").body.textContent}</p>
            </div>
          </div>
          <div className={style["ingredients-section"]}>
            <h2 className={style["subheading"]}>INGREDIENTS:</h2>
            <div className={style["ingredients-container"]}>
              <ul className={style["ingredients-list"]}>
                {recipeDetails.extendedIngredients.map( (ingredient, index) => (
                  <li className={style["qt"]}>  
                    {ingredient.nameClean}&nbsp;
                    {ingredient.measures.metric.amount}
                    {ingredient.measures.metric.unitShort}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style["directions-container"]}>            
            <h2 className={style["subheading"]}>DIRECTIONS:</h2>
            {recipeDetails.analyzedInstructions.map( (instruction, index) => (
              <div className={style["preparation"]} key={index}>
                {instruction.steps.map( (step, stepIndex) => (
                  <div className={style["steps"]} key={stepIndex}>
                    <h3 className={style["step-num"]}>Step {stepIndex + 1}</h3>
                    {step.equipment.length > 0 && (
                      <p className={style["equip"]}><b>Equipment:</b> {step.equipment.map( equip => equip.name ).join(", ")}</p>
                    )}
                    <p className={style["directions"]}><b>Directions:</b>{step.step}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <code>...Loading...</code>
      )}
      {error && (
        <div className="error-message">
          <img src={errorIcon} className="error-icon" alt="Error Icon"/>
          Ops, There has been an error: <br/> {error.message}
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default RecipesDetails