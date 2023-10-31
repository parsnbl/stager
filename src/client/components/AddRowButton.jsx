import React from 'react';
import * as Icons from 'react-feather';
import styles from '../stylesheets/AddRowButton.module.scss';

const AddButton = ({ clickHandler, row, column }) => {
  //console.log(clickHandler)
  return (
    <div 
      className={styles.add_row_button}
      style={{
        gridRow: row,
        gridColumn: column
      }}
    >
      <Icons.Plus onClick={()=> clickHandler()}/>
    </div>
    );
};

export default AddButton;