import React from 'react'
import './navbar.css'
import Logo from '../../assets/logo-2.png'
import MobileMenue from '../MobileMenue/MobileMenue'
import { Link } from "react-router-dom";
import LangMenue from '../LangMenue/LangMenue'
import Discover from '../Discover/Discover'
import Donate from '../Donate/Donate'
import Share from '../Share/Share'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const Navbar = () => {

  const { setShowRoadmap } = useContext(UserContext);


  return (
    <header className='navbar'>
      <div className="navbar-left">
       <Link to='/' onClick={()=>setShowRoadmap(true)}><img src={Logo} alt="" /></Link>
      </div>

      <nav>
        <ul>
        <li><Link to='/' className='navbar-link'>home</Link></li>
        <Link to='/aboutus' className='navbar-link'><li>about us</li></Link>
        <Link to='/contactus' className='navbar-link'><li>contact us</li></Link>
        <Link to='/faq' className='navbar-link'><li>faq</li></Link>
        <li><Discover/></li>
        </ul>
      </nav>

      <div className="navbar-right">
      <LangMenue className='right-icon'/>
      <Share className='right-icon'/>
      <Donate className='right-icon'/>
      <MobileMenue className='right-icon'/>
      </div>
    </header>
  )
}

export default Navbar
