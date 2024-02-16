import React from "react";
import styles from "../styles/SignUp.module.css";
import Intro from "../components/layout/Intro/Intro";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SignUp() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username'); // Replace with the actual field names
    const password = formData.get('password');
    const email = formData.get('email');
    // Add additional fields as necessary

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
  
      if (response.ok) {
        navigate('/login', { state: { fromSignup: true } });
      } else {
        setErrorMessage("Email or Username Taken");
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  return (
    <main className={styles.wrapper}>
      <Intro />
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Sign Up.</h1>
        <form className={styles.form} onSubmit={handleSignUp}>
          <div className={styles.inputWrap}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input type="email" className={styles.input} name="email"></input>
          </div>
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
          </div>
          <button className={styles.button}>Create account</button>
          <span className={styles.signupWrap}>
            <p className={styles.signupPrompt}>Have an account?</p>
            <Link to="/login" className={styles.signupLink}>
              Login
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

export default SignUp;
