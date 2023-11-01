import React from 'react'
import styles from '../stylesheets/TextArea.module.scss'

const TextArea = (props) => {
  let styleSelect = styles.default_text_area;
  let value = props.value === null ? '' : props.value;
  //console.log('textarea props', props)
  return (
    <textarea
      key={props._key}
      className={styleSelect}
      value={value}
      rows={1}
      wrap={'off'}
      onChange={props.changeHandler}
      readOnly={props.readOnly}
    />
  )
}

export default TextArea
