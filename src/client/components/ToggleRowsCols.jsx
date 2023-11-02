import React from 'react';
import * as Icons from 'react-feather';
import styles from '../stylesheets/ToggleRowsCols.module.scss';

const ToggleRowsCols = ({ toggleAddHandler, toggleSubHandler , row, column, size }) => {
  //console.log(clickHandler)
  return (
    <div 
      className={styles.add_row_button}
      style={{
        gridRow: row,
        gridColumn: column
      }}
    >
      <Icons.Plus size={size} onClick={toggleAddHandler}/>
      <Icons.Minus size={size} onClick={toggleSubHandler}/>
    </div>
    );
};

export default ToggleRowsCols;