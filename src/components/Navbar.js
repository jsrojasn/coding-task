import React from 'react';
import {  Link } from 'react-router-dom';

import '../styles/navbar.css';

const CLIENT_ID = "6341f7b83283b6c60917";
// const CLIENT_SECRET= "d9d53eb0c1d3ded6a7407077de5405c73808d229"
const REDIRECT_URI = "http://localhost:3000/github";

const Navbar = props => { 
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/" style={{textDecoration: "none"}}>
          <h1>HelloBuild</h1>
        </Link>
      </div>
      <nav className="navbar__items">
        <ul>
          <li>
            <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>My Repositories</a>
          </li>
          <li>
            <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar.events.readonly&redirect_uri=http://localhost:3000/calendar&response_type=token&client_id=666456875239-38mn11b2ltvvv3h1635rijct9nfq5eq7.apps.googleusercontent.com">My Calendar</a>
          </li>           
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
