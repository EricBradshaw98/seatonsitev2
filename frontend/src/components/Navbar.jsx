import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SeatonValley from "../assets/SeatonValley.png";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "../styles/navbar.scss";

const Navbar = ({ dispatch, state }) => {
  
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const cookies = new Cookies();
  const token = cookies.get("token");
  
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
      setUserEmail(decodedToken.userEmail);
      setUserUsername(decodedToken.userUsername);
      dispatch({ type: "SET_LOGIN_STATE", payload: true }); // Set state.login to true if token exists
    }
  }, [dispatch]); // Adding dispatch to the dependency array

  const handleLogout = () => {
    cookies.remove("token");
    dispatch({ type: "SET_LOGIN_STATE", payload: false }); 
    window.location.reload()
  };

  const decodedToken = token ? jwtDecode(token) : null;
  const adminToken = decodedToken ? decodedToken.userAdmin : false;

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    {/* Hamburger menu button */}
    <div className="bars" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      <nav className="nav">
        <div className="nav-logo">
          <img src={SeatonValley} alt="Seaton Valley" />
        </div>

        {/* Hamburger menu button */}
        <div className="bars" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Menu items */}
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>

          {adminToken && (
            <NavLink to="/admin" className="nav-link" activeClassName="active">
              Admin
            </NavLink>
          )}

          <NavLink to="/aboutus" className="nav-link" activeClassName="active">
            About Us
          </NavLink>

          

          <NavLink to="/club" className="nav-link" activeClassName="active">
            Club News
          </NavLink>

          <NavLink to="/galleries" className="nav-link" activeClassName="active">
            Gallery
          </NavLink>

          <NavLink to="/contact" className="nav-link" activeClassName="active">
            Contact
          </NavLink>

          <NavLink to="/listings" className="nav-link" activeClassName="active">
            Listings
          </NavLink>

         

          

          {userId ? (
            <NavLink to="/login" className="nav-link" activeStyle={{}}>
              Manage Account
            </NavLink>
          ) : (
            ""
          )}
        </div>

        {/* Sign-up/Login section */}
        <div className="nav-signup">
          {userId ? (
            <>
              <div className="nav-link">
                <div className="nav-user">
                  Logged in as: <span>{userUsername} </span>
                </div>
                <span> / </span>
                <button className="nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/sign-up" className="nav-link" activeClassName="active">
                Sign Up
              </NavLink>
              <span className="nav-link-divider">/</span>
              <NavLink to="/login" className="nav-link" activeClassName="active">
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
