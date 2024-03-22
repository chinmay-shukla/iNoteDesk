import React, { useContext, useState } from 'react'
import '../css/Navbar.css'
import Search from './Search'
import Login from './Userprofile'
import {
  Link,
  useLocation
} from "react-router-dom";
import { themeContext } from '../context/themeContext';

const Navbar = () => {
  const [SearchUI, setSearchUI] = useState(false)
  const [MenuUI, setMenuUI] = useState(false)
  const [LoginUI, setLoginUI] = useState(false)
  const pagepath = useLocation().pathname
  const { theme, setTheme } = useContext(themeContext)

  return <>
    <header className="header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">I-Notes</Link>

        <div className={`nav__menu ${MenuUI && "show-menu"}`}>
          <ul className="nav__list">

            <li className="nav__item">
              <Link to="/" className={`nav__link ${pagepath === "/" ? "active" : ""}`}>Home</Link>
            </li>

            <li className="nav__item">
              <Link to="/addnotes" className={`nav__link ${pagepath === "/addnotes" ? "active" : ""}`}>Add Notes</Link>
            </li>

          </ul>

          <div className="nav__close" onClick={() => setMenuUI(false)}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__actions ">


          <i className="ri-search-line nav__search" onClick={() => setSearchUI(true)}></i>

          <i className="ri-moon-line nav__search" onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}></i>

          <i className="ri-user-line nav__login" onClick={() => setLoginUI(true)}></i>

          <div className="nav__toggle" onClick={() => setMenuUI(true)}>
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>
    </header >


    <Search info={{ SearchUI, setSearchUI }} />
    <Login info={{ LoginUI, setLoginUI }} />
  </>;
}

export default Navbar