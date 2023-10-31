import React from 'react';
import * as Icons from 'react-feather';
import styles from '../stylesheets/AddRowButton.module.scss';

const AddRowButton = ({ clickHandler }) => {
  return (
    <div className={styles.add_row_button}>
      <Icons.Plus onClick={()=> clickHandler()}/>
    </div>
    );
};

export default AddRowButton;