import React from 'react';
import styles from '../stylesheets/ColorBox.module.scss';


const ColorBox = ({ hex }) => {
  const style = {
    backgroundColor: hex,
  };
  //console.log(style);
  return (
    <div
      className={styles.default_color_box} 
      style={style}>
    </div>
  );
};




export default ColorBox;