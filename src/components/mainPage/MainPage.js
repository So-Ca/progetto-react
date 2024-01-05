import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import axios from "axios";
import style from "./mainPage.module.scss";
import searchIcon from "../../assets/images/icons/search.svg";
import logo from "../../assets/images/veggy-logo.avif";
import warningIcon from "../../assets/images/icons/warning-icon.png";
import errorIcon from "../../assets/images/icons/error-icon.png";
import Carousel from "../carousel/Carousel";
import Recipe from "../recipe/Recipe";

function MainPage() {

  const apiKey = process.env.REACT_APP_API_KEY;
  const [query, setQuery] = useState("vegetarian");
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleRecipes, setVisibleRecipes] = useState(20);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const request = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&fillIngredients=true&addRecipeInformation=true&instructionsRequired=true&addRecipeNutrition=true&number=100&vegetarian=true&apiKey=${apiKey}`;

  // api request
  useEffect( ()=> {
    async function getRecipes(){
      try{
        setIsLoading(true);
        const response = await axios.get(request);
        const data = response.data;
        const vegetarian = data.results.filter( recipe => recipe.vegetarian === true);

        if(query.trim() === ""){
          setRecipes([]);
          setWarningMessage(true);
          return;
        }
        if(vegetarian.length === 0){
          setRecipes([]);
          setWarningMessage(true);
          return;
        }

        setRecipes(vegetarian);
        console.log("Those are the vegetarian recipes:", vegetarian);
        setWarningMessage(false);
        setIsLoading(false);
      } catch(error){
        console.error("Ops, there has been an error: ", error);
        setError(error);
        setIsLoading(false);
      }
    }
    getRecipes();
  }, [query, request]);

  // searchBar input search
  function searchRecipes(e){
    setSearch(e.target.value)
  }

  function getSearch(e){
    e.preventDefault();
    setIsLoading(true);
    setQuery(search);
    setSearch("");
  }

  // more results
  function showMoreRecipes(){
    setVisibleRecipes( prevValue => prevValue + 20);
  }

  const RecipesPreview = recipes && recipes.slice(0, visibleRecipes).map( recipe => (
    <Recipe key={recipe.id} props={recipe}/>
  ));

  return (
    <>
      <Helmet>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/* Description */}
        {/* Search Engine */}
        <meta name="description" content="Explore a delightful world of vegetarian culinary delights! Discover a diverse collection of plant-based recipes, from quick and easy meals to gourmet delights. Our site is your go-to destination for flavorful and nutritious vegetarian dishes. Unleash your creativity in the kitchen with our extensive recipe database, perfect for both seasoned chefs and cooking enthusiasts. Start your journey to a tastier, healthier lifestyle with our curated selection of vegetarian recipes."/>
        {/* Open Graph for social media */}
        <meta name="og:title" property="og:title" content="Vegetarian Recipe search App"/>
        <meta property="og:description" content="Embark on a culinary journey with our Vegetarian Recipe Search App! Discover a world of delicious and wholesome plant-based dishes. From quick and easy weekday meals to gourmet creations, our app offers a diverse collection of vegetarian recipes for every palate. Elevate your cooking experience and explore a healthier lifestyle through our carefully curated selection. Join us in celebrating the joy of vegetarian cuisine and unlock a world of flavor at your fingertips"/>
        <meta name="robots" content="index, follow"/>
        <meta property="og:url" content="https://so-ca.github.io./"/>
        {/* Favicon */}
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        {/* FONTS */}
        {/* Josefin Sans 200 */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200&display=swap" rel="stylesheet"/>
        {/* Josefin Sans 400 */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet"/>
        {/* Hedvig Letters Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Sans&display=swap" rel="stylesheet"/>
        {/* Playpen Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans&display=swap" rel="stylesheet"/>
        <title>Veggy Recipes</title>
      </Helmet>

      <div className={style["app"]}>
        <div className={style["header"]}>
          <img className="logo" src={logo} alt="logo"/>
          <h1 className={style["app-title"]}>GREEN PLATES: Vegetarian Delights</h1>
          <form className={style['search-form']} onSubmit={getSearch}>
            <input className={style["search-bar"]} type="text" value={search} onChange={searchRecipes} placeholder="Find your favorite recipe..."/>
            <button className={style["search-btn"]} type="submit"><img src={searchIcon} alt="search icon"/></button>
          </form>
        </div>
        {isLoading && (
          <div className="loader-container">
            ...Loading...
            <div className="loader"></div>
          </div>
        )}
        <div className={style['bg-carousel']}>
          <Carousel images={recipes.slice(0, 5).map(recipe => recipe.image)}/>
        </div>
        {warningMessage && (
          <div className="warning-message">
            <img src={warningIcon} className="warning-icon" alt="Warning Icon"/>
            Attention, the search did not yield any results.<br/>
            Enter an ingredient or a recipe in the search bar.<br/>
            Ensure that the searched recipe is vegetarian.<br/>
            Ensure that the searched ingredient is vegetarian.<br/>
          </div>
        )}
        <div className={style["recipes-grid"]}>
          {RecipesPreview}
        </div>
        {visibleRecipes < recipes.length && (
          <button className={style["show-more-btn"]} onClick={showMoreRecipes}>Show More</button>
        )}
        {error && (
          <div className='error-message'>
            <img src={errorIcon} className="error-icon" alt="Error Icon"/>
            Ops, There has been an error: <br/> {error.message}
          </div>
        )}
      </div>
    </>
  )
}

export default MainPage