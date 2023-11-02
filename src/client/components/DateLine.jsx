import React from 'react';
import styles from '../stylesheets/DateLine.module.scss';

const DateLine = ({ column, span , visible}) => {
  const style = {
    gridRow: `2 / span ${span}`,
    gridColumn: `${column} / span 1`,
    visibility: visible ? 'visible' : 'hidden'
  }
  return (
    <div 
      className={styles.default_dateline}
      style={style}
    ></div>
  );
};

export default DateLine;