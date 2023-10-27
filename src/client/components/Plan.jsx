import React from 'react';
import styles from '../stylesheets/Plan.module.scss';

const Plan = props => {
  
  return (
    <div className={styles.plan_container}>
      <div className={styles.plan_details}>
        <h1>PLAN</h1>
      </div>
      <div className={styles.plan_headers}>
        <div>Row Label</div>
        <div>Start Date</div>
        <div>Due Date</div>
        <div>Status</div>
      </div>
      <div className={styles.plan_row}>
        <div>Try to do something cool</div>
        <div>10/20/2023</div>
        <div>10/31/2023</div>
        <div>In Progress</div>
      </div>
      <div className={styles.plan_row}>
        <div>Try to do something cool</div>
        <div>10/20/2023</div>
        <div>10/31/2023</div>
        <div>In Progress</div>
      </div>
      <div className={styles.plan_row}>
        <div>Try to do something cool</div>
        <div>10/20/2023</div>
        <div>10/31/2023</div>
        <div>In Progress</div>
      </div>
    </div>
  );
};


export default Plan;

