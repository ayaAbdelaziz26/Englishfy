import React from 'react'
import './footer.css'
import Logo from '../../assets/logo-2.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='footer'>
        <ul>
        <li>
            <Link to='/terms'>
              Terms
            </Link>
          </li>

          <li>
            <Link to='/privacy'>
              Privacy
            </Link>
          </li>
        </ul>

        <span>&copy;2025.All Rights Reserved.</span>
        </footer>
  )
}

export default Footer
