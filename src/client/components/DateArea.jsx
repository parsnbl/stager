import React from 'react'
import styles from '../stylesheets/DateArea.module.scss'
import { useSelector, useDispatch } from 'react-redux'

const DateArea = (props) => {
  let styleSelect = styles.default_date_area;
  let value = props.value === null ? '' : props.value;
  //console.log(props)
  return (
    <input
      key={props._key}
      type="date"
      className={styleSelect}
      value={value}
      rows={1}
      wrap={'off'}
      onChange={props.changeHandler}
    />
  )
}

export default DateArea;
