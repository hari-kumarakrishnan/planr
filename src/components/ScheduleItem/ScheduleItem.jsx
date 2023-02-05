import React from "react";
import styles from "../ScheduleItem/ScheduleItem.module.css";

function ScheduleItem() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.day}>Day 1</p>
        <p className={styles.date}>1 / 14 / 23</p>
      </div>
      <div className={styles.main}>
        <p className={styles.city}>Chicago</p>
        <p className={styles.country}>United States</p>
      </div>
      <div className={styles.budgetWrap}>
        <span className={styles.budgetSpan}>
          Budget:
          <p className={styles.budget}>$150</p>
        </span>
      </div>
    </div>
  );
}

export default ScheduleItem;
