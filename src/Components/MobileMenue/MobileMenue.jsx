import React, { useState } from "react";
import "./mobileMenue.css";
import menueIcon from '../../assets/menu.png'
import closeIcon from '../../assets/close.png'
import homeIcon from '../../assets/home.png'
import contactIcon from '../../assets/contact-us.png'
import aboutIcon from '../../assets/group.png'
import faqIcon from '../../assets/faq.png'
import englishIcon from '../../assets/english.png'
import tipsIcon from '../../assets/tips.png'
import featuresIcon from '../../assets/features.png'
import benefitssIcon from '../../assets/benefits.png'
import listenIcon from '../../assets/listen.png'
import basicsIcon from '../../assets/basics.png'
import { Link } from "react-router-dom";


const MobileMenue = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mobile-parent">
    <div className="mobile-menu">
      <img
        src={menueIcon}
        alt="Menu"
        className='menue'
        onClick={toggleMenu}
      />

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <img src={closeIcon} alt="close" className="close" onClick={()=>{toggleMenu()}}/>
        <ul>
          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/'>
              <img src={homeIcon} alt="Home" />
              home
            </Link>
          </li>

          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/englisharticle'>
              <img src={englishIcon} alt="Home" />
              why english?
            </Link>
          </li>

          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/basics'>
              <img src={basicsIcon} alt="Home" />
              english basics
            </Link>
          </li>

          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/listen'>
              <img src={listenIcon} alt="Home" />
              listenning routine
            </Link>
          </li>

          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/benefits'>
              <img src={benefitssIcon} alt="Home" />
              english benefits
            </Link>
          </li>

          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/features'>
              <img src={featuresIcon} alt="Home" />
              site features
            </Link>
          </li>

          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/tips'>
              <img src={tipsIcon} alt="Home" />
              tips
            </Link>
          </li>

          
          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/aboutus'>
              <img src={aboutIcon} alt="Contact Us" />
              about us
            </Link>
          </li>
          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/contactus'>
              <img src={contactIcon} alt="About Us" />
              contact us
            </Link>
          </li>
          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/faq'>
              <img src={faqIcon} alt="FAQ" />
              FAQ
            </Link>
          </li>
          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/terms'>
            Terms
            </Link>
          </li>
          <li onClick={()=>{setIsMenuOpen(false)}}>
            <Link to='/privacy'>
              Privacy
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default MobileMenue;
