import React from 'react';
import styles from '../stylesheets/GanttBar.module.scss';


const GanttBar = ({ row, startDate, endDate, startColumn, lengthOfBar, color}) => {

  if (color === undefined || color === null) color = '#ADF6B1';
  const style = {
    gridRow: `${row} / span 1`,
    backgroundColor: color, // fix
    gridColumn: `${startColumn} / span ${lengthOfBar}`
  }
  return (
    <div 
      className={styles.default_gantt_bar}
      style={style}
    >

    </div>
  );
};

export default GanttBar;