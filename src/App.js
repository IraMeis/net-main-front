import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Profile from "./components/Profile";
import BoardNotes from "./components/BoardNotes";
import BoardFilter from "./components/BoardFilter";

import EventBus from "./common/EventBus";

const App = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowNotes(true);
      setShowFilters(user.roles.some(role =>["system","user_data_admin_viewer"].includes(role)));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowFilters(false);
    setShowNotes(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <Link to={"/"} className="navbar-brand">
          testPoint
        </Link>

        <div className="navbar-nav mr-auto">

          {showNotes && (
              <li className="nav-item">
                <Link to={"/note"} className="nav-link">
                  Notes
                </Link>
              </li>
          )}

          {showFilters && (
            <li className="nav-item">
              <Link to={"/filter"} className="nav-link">
                Filters & Statistic
              </Link>
            </li>
          )}

            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/note" element={<BoardNotes/>} />
          <Route path="/filter" element={<BoardFilter/>} />
          <Route path="/about" element={<About/>} />

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />

        </Routes>
      </div>

    </div>
  );
};

export default App;
