import React from 'react';
import styles from '../stylesheets/HeaderCell.module.scss';

const HeaderCell = ({ row, column, value}) => {
  const styleSettings = {
    gridRow: row,
    gridColumn: column
  };
  return (
    <div 
      className={styles.plan_header_cell}
      style={styleSettings}
    >
      {value}
    </div>
  );
};

export default HeaderCell;