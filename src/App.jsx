import "./App.css";
import { Outlet } from "react-router-dom";
import { Auth } from "./context/Auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeQuestions } from "./context/HomeQuestions";
import Home from "./pages/Home";

function App() {
  let navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (isAuthenticated === null || isAuthenticated === false) {
      navigate("/login");
    } else {
      navigate("/dailyschedule");
    }
  }, []);

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <HomeQuestions.Provider value={{ answers, setAnswers }}>
        <Outlet />
      </HomeQuestions.Provider>
    </Auth.Provider>
  );
}

export default App;
