import React from "react";
import styles from "../styles/Schedule.module.css";
import ScheduleHeader from "../components/ScheduleHeader/ScheduleHeader";
import ScheduleItem from "../components/ScheduleItem/ScheduleItem";

function Schedule() {
  return (
    <main className={styles.wrapper}>
      <ScheduleHeader />
      <section className={styles.scheduleItems}>
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </section>
    </main>
  );
}

export default Schedule;
