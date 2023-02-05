import React, { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { ReactComponent as Logo } from "../assets/headerLogo.svg";
import { ReactComponent as Pfp } from "../assets/pfp.svg";
import {
  MapPinIcon,
  CurrencyDollarIcon,
  LightBulbIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { HomeQuestions } from "../context/HomeQuestions";

function Home() {
  const [questionCount, setQuestionCount] = useState(0);
  const { answers, setAnswers } = useContext(HomeQuestions);
  const [answer, setAnswer] = useState("");
  const [placeholders, setPlaceholders] = useState([
    "New York City, New York",
    "$300",
    "Family getaway",
    "1/14/23 to 1/20/23",
  ]);

  const [questions, setQuestions] = useState([
    ["Hey Eric, Where are you going?"],
    ["What's your budget?"],
    ["What kind of trip is this?"],
    ["When are you going?"],
  ]);

  const [icons, setIcons] = useState([
    <MapPinIcon className={styles.locationIcon} />,
    <CurrencyDollarIcon className={styles.locationIcon} />,
    <LightBulbIcon className={styles.locationIcon} />,
    <CalendarIcon className={styles.locationIcon} />,
  ]);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleNext = () => {
    setAnswers([...answers, answer]);
    setAnswer("");
    setQuestionCount(questionCount + 1);
  };

  const handleInput = () => {
    if (answers[1] > 1000) {
      answers[1] = "high";
    }
    else {
      answers[1] = "low";
    }
    const dates = answer.split(" ");
    answers[3] = dates[0];
    answers.push(dates[2]);
  }

  async function handleSubmit(e) {
    setAnswers([...answers, answer]);
    setAnswer("");
    setQuestionCount(0);
    handleInput();
    const response = await fetch ("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Provide a ${answers[1]} ${answers[2]} vacation plan with exact time frames for a trip to ${answers[0]} between ${answers[3]} and ${answers[4]}. In addition, after each activity, include the estimated travel time, cost and temperature. Finally, include any website links that are related to these activities.`,
      })
    });
    const data = await response.json();
    const text = data['data'];
    console.log(text.split("\n\n"));
    setAnswers([]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.logoWrap}>
          <Logo className={styles.logo} />
          <h1 className={styles.title}>planr</h1>
        </span>
        <span className={styles.buttonWrapper}>
          <button type="button" className={styles.button}>
            New Trip!
          </button>
          <button type="button" className={styles.button}>
            Past Trips
          </button>
        </span>
        <span className={styles.profileWrap}>
          <Pfp className={styles.pfp} />
          <p className={styles.name}>Eric S.</p>
        </span>
      </div>

      <section className={styles.main}>
        <h1 className={styles.question}>{questions[questionCount]}</h1>
        <div className={styles.inputWrap}>
          {icons[questionCount]}
          <input
            type="text"
            className={styles.input}
            value={answer}
            onChange={handleAnswer}
            placeholder={placeholders[questionCount]}
          ></input>
        </div>
        {questionCount === 3 ? (
          <button className={styles.nextButton} onClick={handleSubmit}>
            Get my plan!
          </button>
        ) : (
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        )}
      </section>
    </div>
  );
}

export default Home;
