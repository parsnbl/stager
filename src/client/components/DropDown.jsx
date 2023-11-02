import React, { useState } from 'react';
import * as Icons from 'react-feather';
import styles from '../stylesheets/DropDown.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setColIdxAtInd,
  getColumnByIdx,
  renameColIdx,
} from '../reducers/planSlice';
import { dataTypes } from '../../lib/tableLib';

const DropDownOption = ({ elem, clickHandler }) => {
  return (
    <div
      className={styles.options_item}
      onClick={() => {
        console.log(elem);
        clickHandler(elem.value);
      }}
    >
      {elem.label}
    </div>
  );
};

const DropDown = ({ options, ind, idx, type }) => {
  //console.log(options)
  //console.log('child copy of state', columnObj);
  //console.log('SET:', options, value)
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const columnObj = useSelector((state) => getColumnByIdx(state, idx));
  let cellValue = columnObj.values[ind];
  //console.log(cellValue)
  if (cellValue === null || cellValue === undefined) {
    if (type === dataTypes.const.COLOR) {
      cellValue = 'light-green';
    }
    if (type === dataTypes.const.BUTTON) {
      cellValue = 'upcoming';
    }
  }
  let currentSelection = Object.values(options).find(
    (elem) => elem.value === cellValue
  );

  const setNewSelection = (input) => {
    console.log('Set new selection called', input);
    deferredChangeHandler(input);
    setShowMenu(!showMenu);
  };

  const processedOptions = Object.values(options).reduce((acc, elem, i) => {
    if (elem.value !== currentSelection.value) {
      acc.push(
        <DropDownOption
          key={`${idx}_${ind}_${i}`}
          clickHandler={setNewSelection}
          elem={elem}
        />
      );
    }
    return acc;
  }, []);

  //console.log(processedOptions)

  const deferredChangeHandler = (value) => {
    dispatch(setColIdxAtInd({ idx, ind, value: value }));
  };

  const toggleMenuVisibility = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.drop_down_wrapper}>
      <div className={styles.current_value_wrapper}>
        <div className={styles.current_value}>{currentSelection.label}</div>
        <Icons.ChevronDown onClick={toggleMenuVisibility} />
      </div>
      <div
        style={{
          visibility: showMenu ? 'visible' : 'hidden',
          opacity: showMenu ? 1 : 0,
        }}
        className={styles.options_container}
      >
        {processedOptions}
      </div>
    </div>
  );
};

export default DropDown;
