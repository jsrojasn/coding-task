import React from 'react';
import {BrowserRouter as Router, Route, } from "react-router-dom"

import MainPage from "./pages/Main"
import SignupPage from "./pages/Signup"
import LoginPage from "./pages/Login"
import GithubPage from "./pages/Github"
import CalendarPage from "./pages/Calendar"
import './App.css';

const App = () => {
  
  return (
    <div className="App">
      <Router>
        <>
          <Route path="/" exact component={MainPage}/>
          <Route path="/signup" component={SignupPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/github"  component={GithubPage}/>
          <Route path="/calendar"  component={CalendarPage}/>
        </>
      </Router>
    </div>
  );
}

export default App;
