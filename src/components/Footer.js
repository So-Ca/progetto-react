import React from 'react';
import logo from "../assets/images/veggy-logo.avif";
import instagram from "../assets/images/icons/instagram.svg";
import facebook from "../assets/images/icons/facebook.svg";
import twitter from "../assets/images/icons/twitter.svg";
import tiktok from "../assets/images/icons/tiktok.svg";
import youtube from "../assets/images/icons/youtube.svg";
import style from "../style/footer.module.css";

function Footer() {
  return (
    <footer className={style["footer"]}>
      <div className={style["info-container"]}>
        <img className="logo" src={logo} alt="logo"/>
        <p className={style["copyright"]}>&copy; 2023 GREEN PLATES</p>
        <a className={style["contacts"]} href="/">Contacts us</a>
      </div>
        <div className={style["icons-container"]}>
          <a href="/"><img className={style["icon"]} src={instagram} alt="instagram icon"/></a>
          <a href="/"><img className={style["icon"]} src={facebook} alt="facebook icon"/></a>
          <a href="/"><img className={style["icon"]} src={twitter} alt="twitter icon"/></a>
          <a href="/"><img className={style["icon"]} src={tiktok} alt="tiktok icon"/></a>
          <a href="/"><img className={style["icon"]} src={youtube} alt="youtube icon"/></a>
      </div>
    </footer>
  )
}

export default Footer