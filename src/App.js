import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/navbar/userEssent/Login";
import Register from "./components/navbar/userEssent/Register";
import About from "./components/navbar/main/About";
import NotFound from "./components/NotFound";
import Profile from "./components/navbar/userEssent/Profile";
import Notes from "./components/navbar/main/notes/Notes";
import Filters from "./components/navbar/main/filters/Filters";

import EventBus from "./common/EventBus";
import FullPostComment from "./components/navbar/main/notes/FullPostComment";

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
              <a href={"/login"} className="nav-link" onClick={logOut}>
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
            <Route path="/note" element={<Notes/>} />
            <Route path="/note/:id" element={<FullPostComment/>} />
            <Route path="/filter" element={<Filters/>} />
            <Route path="/about" element={<About/>} />

            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />

            <Route path="/*" element={<NotFound/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
