import React from "react";
import DailyScheduleItem from "../components/DailyScheduleItem/DailyScheduleItem";
import styles from "../styles/DailySchedule.module.css";
import DailyScheduleHeader from "../components/DailyScheduleHeader/DailyScheduleHeader";

function DailySchedule() {
  return (
    <main className={styles.wrapper}>
      <DailyScheduleHeader />
      <div className={styles.activityWrap}>
        <DailyScheduleItem />
      </div>
    </main>
  );
}

export default DailySchedule;
