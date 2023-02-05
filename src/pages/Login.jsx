import React from "react";
import styles from "../styles/Login.module.css";
import Intro from "../components/layout/Intro/Intro";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className={styles.wrapper}>
      <Intro />
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Login.</h1>
        <form className={styles.form}>
          <div className={styles.inputWrap}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input type="text" className={styles.input} name="username"></input>
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>rmm
            <input type="text" className={styles.input} name="password"></input>
            <p className={styles.forgotPassword}>Forgot password?</p>
          </div>
          <button className={styles.button}>Login</button>
          <span className={styles.signupWrap}>
            <p className={styles.signupPrompt}>Don't have an account?</p>
            <Link to="/signup" className={styles.signupLink}>
              Sign up.
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
}

export default Login;
