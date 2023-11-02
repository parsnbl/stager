import React from 'react';
import styles from '../stylesheets/DateHeader.module.scss';

const DateHeader = ({ column, value }) => {
  const style = {
    gridRow: '1 / span 1',
    gridColumn: `${column} / span 1`
  };
  return (
    <div 
      className={styles.default_date_header}
      style={style}
    >
      {value}
    </div>
  );
};

export default DateHeader;
