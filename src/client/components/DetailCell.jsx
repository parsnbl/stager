import React, { useRef } from 'react';
import styles from '../stylesheets/DetailCell.module.scss';
import { dataTypes } from '../../lib/TableLib.js';
import TextArea from './TextArea.jsx';
import TextButton from './TextButton.jsx';
import DateArea from './DateArea.jsx';
import { useSelector, useDispatch } from 'react-redux'
import { setColIdxAtInd, getColumnByIdx, renameColIdx } from '../reducers/planSlice';

const options = {
  RAW: TextArea,
  TEXT: TextArea,
  DATE: DateArea,
  BUTTON: TextButton,
  LIST: null,
  EMPTY: null,
}


const DynamicCell = (props) => {
  const { component } = props;
  const CellType = component;
  return (<CellType {...props} />);
};



const DetailCell = ({ row, column, type, header}) => {
  const dispatch = useDispatch();
  const idx = Number(column.slice(0,1));
  const ind = Number(row.slice(0,1)) - 2;
  const columnObj = useSelector(state => getColumnByIdx(state, idx));
  //console.log('idx',idx, 'col', columnObj)
  let cellValue = columnObj.values[ind];
  //console.log('idx', idx, 'ind', ind, columnObj)
  const styleSettings = {
    gridRow: row,
    gridColumn: column
  };
  let styleSelect = styles.plan_detail_cell;
  const extraProps = {};
  let readOnly = false;
  
 
  const key = `${idx}_${ind}_inner`
  //console.log('currentKey', key, 'idx', idx, 'id', ind)

  const cellChangeHandler = e => {
    dispatch(setColIdxAtInd({idx, ind, value:e.target.value}));
  };
  const headerChangeHandler = e => {
    dispatch(renameColIdx({idx, value:e.target.value}));
  };

  let selectedHandler = cellChangeHandler;
  //console.log('styleSettings', styleSettings)
  if (header) {
    type = dataTypes.const.TEXT;
    readOnly = columnObj.fixed;
    styleSelect = styles.plan_header_cell;
    cellValue = columnObj.column;
    selectedHandler = headerChangeHandler;
  }
  return (
    <div 
      className={styleSelect}
      style={styleSettings}
    >
      {/* <TextArea 
        key={key}
        value={cellValue}
        changeHandler={dynamicChangeHandler}
      /> */}
      <DynamicCell 
        _key={key}
        component={options[type]}
        value={cellValue}
        row={row}
        column={column}
        changeHandler={selectedHandler}
        readOnly={readOnly}
      />
    </div>
  );
};

export default DetailCell;