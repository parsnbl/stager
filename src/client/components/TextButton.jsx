import React from 'react';
import styles from '../stylesheets/TextButton.module.scss';

const TextButton = (props) => {
  let styleSelect = styles.default_text_button;
  let value = props.value === null? '': props.value;
  const text = String(value).toUpperCase()
  
  return (
    <div
      key={props._key}
      className={styleSelect}
    >
      {text}
    </div>
  );
};

export default TextButton;