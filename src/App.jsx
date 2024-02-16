import "./App.css";
import { Outlet } from "react-router-dom";
import { Auth } from "./context/Auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeQuestions } from "./context/HomeQuestions";
import Home from "./pages/Home";

function App() {
  let navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("isAuthenticated") === "true");

  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [isAuthenticated]); 

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <HomeQuestions.Provider value={{ answers, setAnswers }}>
        <Outlet />
      </HomeQuestions.Provider>
    </Auth.Provider>
  );
}

export default App;
