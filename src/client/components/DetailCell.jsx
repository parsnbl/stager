import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../stylesheets/DetailCell.module.scss';
import { dataTypes } from '../../lib/tableLib.js';
import {
  setColIdxAtInd,
  getColumnByIdx,
  renameColIdx,
} from '../reducers/planSlice';

import TextArea from './TextArea.jsx';
import TextButton from './TextButton.jsx';
import DateArea from './DateArea.jsx';
import DropDown from './DropDown.jsx';
import ColorBox from './ColorBox.jsx';

const typeOptions = {
  RAW: TextArea,
  TEXT: TextArea,
  DATE: DateArea,
  BUTTON: DropDown,
  COLOR: DropDown,
};

export const colorOptions = {
  0: { value: 'gamboge', label: <ColorBox hex={'#F3A738'} /> },
  1: { value: 'mimi-pink', label: <ColorBox hex={'#EDD2E0'} /> },
  2: { value: 'bittersweet', label: <ColorBox hex={'#FF5E5B'} /> },
  3: { value: 'light-green', label: <ColorBox hex={'#ADF6B1'} /> },
  4: { value: 'tea-green', label: <ColorBox hex={'#DBFEB8'} /> },
  5: { value: 'cadet-gray', label: <ColorBox hex={'#7D98A1'} /> },
  6: { value: 'tropical-indigo', label: <ColorBox hex={'#7F7EFF'} /> },
  7: { value: 'celestial-blue', label: <ColorBox hex={'#20A4F3'} /> },
};

const buttonOptions = {
  0: { value: 'in_progress', label: <TextButton value={'In Progress'} /> },
  1: { value: 'upcoming', label: <TextButton value={'Upcoming'} /> },
  2: { value: 'completed', label: <TextButton value={'Completed'} /> },
  3: { value: 'behind', label: <TextButton value={'Behind'} /> },
  4: { value: 'canceled', label: <TextButton value={'Canceled'} /> },
};
//console.log('DetailCell', colorOptions)

const DynamicCell = (props) => {
  const { component } = props;
  const CellType = component;
  return <CellType {...props} />;
};

const DetailCell = ({ row, column, type, header }) => {
  const dispatch = useDispatch();
  const idx = Number(column.slice(0, 1));
  const ind = Number(row.slice(0, 1)) - 2;
  const columnObj = useSelector((state) => getColumnByIdx(state, idx));

  let cellValue = columnObj.values[ind];
  //console.log('idx', idx, 'ind', ind, columnObj)
  const styleSettings = {
    gridRow: row,
    gridColumn: column,
  };
  let styleSelect = styles.plan_detail_cell;
  const extraProps = {};

  const key = `${idx}_${ind}_inner`;
  //console.log('currentKey', key, 'idx', idx, 'id', ind)

  const cellChangeHandler = (e) => {
    dispatch(setColIdxAtInd({ idx, ind, value: e.target.value }));
  };
  const headerChangeHandler = (e) => {
    dispatch(renameColIdx({ idx, value: e.target.value }));
  };

  let selectedHandler = cellChangeHandler;

  if (header) {
    type = dataTypes.const.TEXT;
    extraProps.readOnly = columnObj.fixed;
    styleSelect = styles.plan_header_cell;
    cellValue = columnObj.column;
    selectedHandler = headerChangeHandler;
    extraProps.style = { width: '109px' };
  }
  if (type === dataTypes.const.BUTTON) {
    extraProps.options = buttonOptions;
    extraProps.idx = idx;
    extraProps.ind = ind;
    extraProps.type = dataTypes.const.BUTTON;
  }
  if (type === dataTypes.const.COLOR) {
    extraProps.options = colorOptions;
    extraProps.idx = idx;
    extraProps.ind = ind;
    extraProps.type = dataTypes.const.COLOR;
  }
  return (
    <div className={styleSelect} style={styleSettings}>
      {/* <TextArea 
        key={key}
        value={cellValue}
        changeHandler={dynamicChangeHandler}
      /> */}
      <DynamicCell
        _key={key}
        component={typeOptions[type]}
        value={cellValue}
        row={row}
        column={column}
        changeHandler={selectedHandler}
        {...extraProps}
      />
    </div>
  );
};

export default DetailCell;
