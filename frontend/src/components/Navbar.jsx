import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Nav, NavLink, NavMenu } from "react-router-dom";
import SunIcon from "../icon/Sunicon";
import MoonIcon from "../icon/Moonicon";
import "../styles/navbar.scss";
import Cookies from "universal-cookie";
import SeatonValley from "../assets/SeatonValley.svg"

const cookies = new Cookies();


const user_id = cookies.get("user_id");

const user_email = cookies.get("email");
const user_username = cookies.get("user_name");


const Navbar = (props) => {
  

  const { dispatch, state } = props;
  const user_id = cookies.get("user_id");
 

  const handleLogout = () => {
    cookies.remove("user_id");
    cookies.remove("user_name");
    cookies.remove("email");
    dispatch({ type: "SET_LOGIN_STATE" });
  };

  return (
    <>
      <nav className="nav">
      <img src={SeatonValley} alt="Seaton Valley" style={{ width: "100px", height: "auto" }} />
        <div className="nav-logo">
          <NavLink to="/stock" activeclassname="active">
            
          </NavLink>
        </div>
        <div className="nav-menu">
        {user_id && (
          <NavLink to="/stock" className="nav-link" activeclassname="active">
            Overview
          </NavLink>
        )}
          {/* Conditionally render Plans link if user_id is true */}
          {user_id && (
            <NavLink to="/Plans" className="nav-link" activeclassname="active">
              Plans
            </NavLink>
          )}
          <NavLink to="/listings" className="nav-link" activeclassname="active">
            Listings
          </NavLink>
          {user_id && (
          <NavLink to="/watchlist" className="nav-link" activeclassname="active">
            My Watchlist
          </NavLink>
          )}
          <NavLink to="/photos" className="nav-link" activeclassname="active">
            Photos
          </NavLink>
          <NavLink to="/users" className="nav-link" activeclassname="active">
            Users
          </NavLink>
          {user_id ? (
            <NavLink to="/login" className="nav-link" activeStyle>
              Manage Account
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="nav-signup">
          {user_id ? (
            <>
              <div className="logged-in">
                <div className="nav-user">Logged in as: <span>{user_username}</span></div>
                <span>/</span>
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
           
              <NavLink to="/sign-up" className="nav-link" activeclassname="active">
                Sign Up
              </NavLink>
              <span className="nav-link-divider">/</span>
              <NavLink to="/login" className="nav-link" activeclassname="active">
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

