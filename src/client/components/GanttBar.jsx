import React from 'react';
import styles from '../stylesheets/GanttBar.module.scss';


const GanttBar = ({ row, startDate, endDate}) => {
  const startColumn = undefined; //fix
  const lengthOfBar = undefined; // fix
  const style = {
    gridRow: row,
    backgroundColor:, // fix
    gridColumn: `${} / span ${}`
  }
  return (
    <div className={styles.default_gantt_bar}>

    </div>
  );
};

export default GanttBar;