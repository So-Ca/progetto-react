import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./components/mainPage/MainPage";
import RecipesDetails from './components/recipesDetails/RecipesDetails';
import Footer from "./components/footer/Footer";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <MainPage/>
            <Footer/>
          </>
        }/>
        <Route path="/recipe/:id" element={<RecipesDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App