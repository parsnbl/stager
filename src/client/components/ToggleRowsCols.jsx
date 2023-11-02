import React from 'react';
import * as Icons from 'react-feather';
import styles from '../stylesheets/ToggleRowsCols.module.scss';

const ToggleRowsCols = ({ toggleAddHandler, toggleSubHandler , row, column, size , location}) => {
  //console.log(clickHandler)
  let selectStyles = styles.add_row_button;
  let label;
  if (location === 'cols') {
    selectStyles = styles.cols_toggle;
    label = 'COLS';
  } else if (location === 'rows') {
    selectStyles = styles.rows_toggle;
    label = 'ROWS';
  }
  return (
    <div 
      className={selectStyles}
      style={{
        gridRow: row,
        gridColumn: column
      }}
    >
      <h4>{label}</h4>
      <Icons.Plus size={size} onClick={toggleAddHandler}/>
      <Icons.Minus size={size} onClick={toggleSubHandler}/>
    </div>
  );
};

export default ToggleRowsCols;