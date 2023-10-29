import React from 'react';
import styles from '../stylesheets/DetailCell.module.scss';

const DetailCell = ({ row, column, text}) => {
  const styleSettings = {
    gridRow: row,
    gridColumn: column
  };
  //console.log('styleSettings', styleSettings)
  return (
    <div 
      className={styles.plan_detail_cell}
      style={{
        gridRow: row,
        gridColumn: column
      }}
    >
      {text}
    </div>
  );
};

export default DetailCell;