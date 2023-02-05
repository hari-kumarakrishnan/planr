import React from "react";
import styles from "../styles/SignUp.module.css";
import Intro from "../components/layout/Intro/Intro";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <main className={styles.wrapper}>
      <Intro />
      <div className={styles.formWrap}>
        <h1 className={styles.title}>Sign Up.</h1>
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
      </div>
    </main>
  );
}

export default SignUp;
