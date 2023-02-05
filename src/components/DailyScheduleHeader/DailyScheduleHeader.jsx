import React from "react";
import styles from "../DailyScheduleHeader/DailyScheduleHeader.module.css";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

function DailyScheduleHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrap}>
        <button className={styles.backButton}>back</button>
        <div className={styles.navigationWrap}>
          <button className={styles.navigationButton}>
            <ArrowLeftIcon className={styles.icon} />
          </button>
          <button className={styles.navigationButton}>
            <ArrowRightIcon className={styles.icon} />
          </button>
        </div>
      </div>
      <h1 className={styles.day}>Day 1</h1>
      <div className={styles.footer}>
        <span className={styles.calendarItem}>
          <CalendarIcon className={styles.icon} />
          <p className={styles.date}>1/14 - 1/30</p>
        </span>
        <span className={styles.budgetSpan}>
          Budget:
          <p className={styles.budget}>$150</p>
        </span>
      </div>
    </div>
  );
}

export default DailyScheduleHeader;
