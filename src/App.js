import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from "axios";
import searchIcon from "./assets/images/icons/search.svg";
import logo from "./assets/images/veggy-logo.avif";
import errorIcon from "./assets/images/icons/error-icon.png";
import warningIcon from "./assets/images/icons/warning-icon.png"
import style from "./style/app.module.css";
import Carousel from "./components/Carousel";
import Recipe from "./components/Recipe";
import RecipesDetails from './components/RecipesDetails';
import Footer from "./components/Footer";

function App() {

  const apiKey = "ae960525345346719ea2b99447dd03a3";
  const [query, setQuery] = useState("vegetarian");
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleRecipes, setVisibleRecipes] = useState(20);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState(false);
  const request = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&fillIngredients=true&addRecipeInformation=true&instructionsRequired=true&addRecipeNutrition=true&number=100&vegetarian=true&apiKey=${apiKey}`;

// api request
  async function getRecipes(){
    try{
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
    } catch(error){
      console.error("Ops, there has been an error: ", error);
      setError(error);
    }
  }

  useEffect( ()=> { getRecipes() }, [query, getRecipes]);

// searchBar input search
  function searchRecipes(e){
    setSearch(e.target.value)
  }

  function getSearch(e){
    e.preventDefault();
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
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div className={style["app"]}>
              <div className={style["header"]}>
                <img className="logo" src={logo} alt="logo"/>
                <h1 className={style["app-title"]}>GREEN PLATES: Vegetarian Delights</h1>
                <form className={style['search-form']} onSubmit={getSearch}>
                  <input className={style["search-bar"]} type="text" value={search} onChange={searchRecipes} placeholder="Find your favorite recipe..."/>
                  <button className={style["search-btn"]} type="submit"><img src={searchIcon} alt="search icon"/></button>
                </form>
              </div>
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
            </div>
            <Footer/>
          </>
        }/>
        <Route path="/recipe/:id" element={<RecipesDetails/>}/>
      </Routes>
      {error && (
        <div className='error-message'>
          <img src={errorIcon} className="error-icon" alt="Error Icon"/>
          Ops, There has been an error: <br/> {error.message}
        </div>
      )}
    </Router>
  )
}

export default App