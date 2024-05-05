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
    window.location.reload();
  };


  const decodedToken = token ? jwtDecode(token) : null;
  const adminToken = decodedToken ? decodedToken.userAdmin : false;

  return (
    <>
      <nav className="nav">

        <div className="nav-logo">
          <img
            src={SeatonValley}
            alt="Seaton Valley"

          />
        </div>
        <div className="nav-menu">

          <NavLink to="/" className="nav-link" activeclassname="active">
            Home
          </NavLink>

          {adminToken && (
            <NavLink to="/admin" className="nav-link" activeclassname="active">
              Admin
            </NavLink>
          )}




          <NavLink to="/aboutus" className="nav-link" activeclassname="active">
            About Us
          </NavLink>

          <NavLink to="/fly" className="nav-link" activeclassname="active">
            What we fly
          </NavLink>

          <NavLink to="/club" className="nav-link" activeclassname="active">
            Club News
          </NavLink>

          <NavLink to="/galleries" className="nav-link" activeclassname="active">
            Gallery
          </NavLink>

          <NavLink to="/contact" className="nav-link" activeclassname="active">
            Contact
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
