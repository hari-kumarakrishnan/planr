import React from "react";
import styles from "../styles/Login.module.css";
import Intro from "../components/layout/Intro/Intro";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "../context/Auth";
import { useEffect } from "react";
import { ReactComponent as Checkmark } from "../assets/checkmark.svg";
function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username'); // Replace with the actual field names
    const password = formData.get('password');
  
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Needed for cookies to be allowed to be sent across origins
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <main className={styles.wrapper}>
      <Intro />
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Login.</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrap}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input type="text" className={styles.input} name="username"></input>
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input type="text" className={styles.input} name="password"></input>
            <p className={styles.forgotPassword}>Forgot password?</p>
          </div>
          <button type="submit" className={styles.button}>Login</button>
          <span className={styles.signupWrap}>
            <p className={styles.signupPrompt}>Don't have an account?</p>
            <Link to="/signup" className={styles.signupLink}>
              Sign up.
            </Link>
          </span>
        </form>
        {errorMessage && 
          <div className={styles.errorMessage}>{errorMessage}</div>
        }
      </div>
    </main>
  );
}

export default Login;
