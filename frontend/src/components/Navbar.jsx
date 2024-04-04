import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SeatonValley from "../assets/SeatonValley.svg";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import "../styles/navbar.scss";

const Navbar = ({ dispatch, state }) => {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  const cookies = new Cookies();

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

  return (
    <>
      <nav className="nav">
        <img
          src={SeatonValley}
          alt="Seaton Valley"
          style={{ width: "100px", height: "auto" }}
        />
        <div className="nav-logo">
          <NavLink to="/stock" activeclassname="active"></NavLink>
        </div>
        <div className="nav-menu">
          {userId && (
            <NavLink to="/stock" className="nav-link" activeclassname="active">
              Overview
            </NavLink>
          )}
          {/* Conditionally render Plans link if userId is true */}
          {userId && (
            <NavLink to="/Plans" className="nav-link" activeclassname="active">
              Plans
            </NavLink>
          )}
          <NavLink to="/listings" className="nav-link" activeclassname="active">
            Listings
          </NavLink>
          {userId && (
            <NavLink to="/watchlist" className="nav-link" activeclassname="active">
              My Watchlist
            </NavLink>
          )}
          <NavLink to="/photos" className="nav-link" activeclassname="active">
            Photos
          </NavLink>
          {userId && (
            <NavLink to="/admin" className="nav-link" activeclassname="active">
              Admin
            </NavLink>
          )}
          <NavLink to="/users" className="nav-link" activeclassname="active">
            Users
          </NavLink>
          {userId ? (
            <NavLink to="/login" className="nav-link" activeStyle>
              Manage Account
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="nav-signup">
          {userId ? (
            <>
              <div className="logged-in">
                <div className="nav-user">
                  Logged in as: <span>{userUsername}</span>
                </div>
                <span>/</span>
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
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
