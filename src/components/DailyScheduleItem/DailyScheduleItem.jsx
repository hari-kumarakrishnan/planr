import React from "react";
import styles from "../DailyScheduleItem/DailyScheduleItem.module.css";
import {
  CloudIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

function DailyScheduleItem() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftGrid}>
        <p className={styles.time}>8AM</p>
        <button className={styles.button}>Links</button>
      </div>
      <div className={styles.centerGrid}>
        <p className={styles.activity}>Breakfast at hostel or Airbnb</p>
      </div>
      <div className={styles.rightGrid}>
        <div className={styles.infoItem}>
          <ClockIcon className={styles.icon} />
          <p className={styles.infoLabel}>1 hr</p>
        </div>
        <div className={styles.infoItem}>
          <CurrencyDollarIcon className={styles.icon} />
          <p className={styles.infoLabel}>$15</p>
        </div>
        <div className={styles.infoItem}>
          <CloudIcon className={styles.icon} />
          <p className={styles.infoLabel}>43 celcius</p>
        </div>
      </div>
    </div>
  );
}

export default DailyScheduleItem;
