import React from 'react';
import { createAction } from '@reduxjs/toolkit';
import DateTime from './DateTime.js';
// import { buttonOptions } from '../client/components/TextButton.jsx';
// import { colorOptions } from '../client/components/ColorBox.jsx';

// const buttonValues = buttonOptions.map(elem => elem.value);
// const colorValues = colorOptions.map(elem => elem.value);

export const dataTypes = {
  const: Object.freeze({
    RAW: 'RAW',
    TEXT: 'TEXT',
    DATE: 'DATE',
    BUTTON: 'BUTTON',
    COLOR: 'COLOR',
  }),
  canCoerce: {
    RAW: (value) => true,
    TEXT: (value) => {
      try {
        const temp = String(value);
        return true;
      } catch(err) {
        return false;
      }
    },
    DATE: (value) => {
      try {
        const temp = new DateTime(value);
        return true;
      } catch(err) {
        return false;
      }
    },
    //BUTTON: (value) => buttonValues.includes(value),
    //COLOR: (value) => colorValues.includes(value),
  }
};

const tableLib = {};

//lower order functions
tableLib.findColumnId = (state, columnKey) => {
  try {
    const output = Object.keys(state._table).find(elem => state._table[elem][state.defaultColKey] === columnKey);
    return output !== undefined ? output : -1;
  } catch(err) {
    console.log('err', err, 'state', state, 'columnKey', columnKey)
  }
};

tableLib.increment = (state, property, val = 1) => {
  if (val + state[property] < 0) {
    state[property] = 0;
  } else {
    state[property] += val;
  }
};

tableLib.returnEntry = (state, k, v, type = dataTypes.const.TEXT, fixed = false) => {
  if (!Object.hasOwn(dataTypes.const, type)) { 
    throw new Error(`Provided type of ${type} not in supported types: ${Object.keys(dataTypes.const).join(', ')}`);
};

  return {[state.defaultColKey]: k, [state.defaultColValues]: v, type, fixed};
};

tableLib.populateNulls = (state) => {
  try {
    for (let i = 0; i < state.colsLen; i++) {
      const column = state._table[i];
      if (column.values.length < state.rowsLen) {
        const delta = state.rowsLen - column.values.length;
        for (let j = 0; j < delta; j++) column.values.push(state.defaultEmpty);
      }
    }
    return;
  } catch(err) {
    console.log(err);
    throw err;
  };
};

tableLib.removeNullRows = (state) => {
  let notFoundNonNullRows = true;
  let rowsRemoved = 0;
  let i = state.rowsLen;
  while (notFoundNonNullRows && i >= 0) {
    if (Object.keys(state._table).every(index => state._table[index][state.defaultColValues][i] === state.defaultEmpty)) {
      Object.keys(state._table).map(index => state._table[index][state.defaultColValues].splice(i, 1));
      i -= 1;
      rowsRemoved += 1;
    } else {
      notFoundNonNullRows = false;
      break;
    }
  }
  tableLib.increment(state, 'rowsLen', -rowsRemoved);
  return [rowsRemoved];
};

// ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', null]
//['2023-10-15', '2023-10-16', '2023-10-17', '2023-10-18', '2023-10-19']

tableLib.setEarliest = (state) => {
  try{
    const col = tableLib.getColumn(state, 'Start Date')
    const earliest = col.values.reduce((acc, val) => {
      if (typeof val === 'string') {
        acc = Math.min(
          new DateTime(acc).makeTimezoneAware(),
          new DateTime(val).makeTimezoneAware()
        );
      }
      return acc;
    });
    //console.log(earliest);
    state.earliestDate = new DateTime(earliest).toLocaleString('en-ca').slice(0,10);
  } catch(err) {
    console.log('err', err, 'state', state);
    throw err;
  }
};

tableLib.setLatest = (state) => {
  try{
    const col = tableLib.getColumn(state, 'Due Date')
    const latest = col.values.reduce((acc, val) => {
      if (typeof val === 'string') {
        acc = Math.max(
          new DateTime(acc).makeTimezoneAware(),
          new DateTime(val).makeTimezoneAware()
        );
      }
      return acc;
    });
    //console.log(latest);
    state.latestDate = new DateTime(latest).toLocaleString('en-ca').slice(0,10);
  } catch(err) {
    console.log('err', err, 'state', state);
    throw err;
  }
};


tableLib.hasColumn = (state, column) => {
  for (let i = 0; i < state.colsLen; i++) {
    if (state._table[i][state.defaultColKey] === column) return true;
  }
  return false;
};

//higher order crud
tableLib.pushColumn = (state, column, values, type, fixed) => {
  try {
    state._table[state.colsLen] = tableLib.returnEntry(
      state, 
      column, 
      values, 
      type,
      fixed  
    );
    tableLib.increment(state,'colsLen', 1);
    tableLib.populateNulls(state);
  } catch(err) {
    console.log(err);
    throw err;
  }
};

tableLib.pushToColumn = (state, column, value) => {
  if (tableLib.hasColumn(state, column)) {
    const id = tableLib.findColumnId(state, column);
    state._table[id][state.defaultColValues].push(value);
    tableLib.increment(state,'rowsLen', 1);
    tableLib.populateNulls(state);
  } else {
    throw new Error(`Column is not available in table: ${column}`);
  }
};

tableLib.setColumn = (state, column, values) => {
  const idx = tableLib.findColumnId(state, column);
  return tableLib.setColumnIdx(state, idx, values);
};

tableLib.setColumnIdx = (state, idx, values) => {
  state._table[idx][state.defaultColValues] = values;
  tableLib.populateNulls(state);
  //return {[idx]: tableLib.returnEntry(state, state._table[idx][state.defaultColKey], state._table[idx][state.defaultColValues])};
};

tableLib.changeColumnType = (state, column, type) => {
  const idx = tableLib.findColumnId(state, column);
  return tableLib.changeColumnTypeIdx(state, idx, type)
};

tableLib.changeColumnTypeIdx = (state, idx, type) => {
  if (!Object.hasOwn(dataTypes, type)) {
    throw new Error(`Provided type of ${type} not in supported types: ${Object.keys(dataTypes).join(', ')}`);
  }
  const values = state._table[idx][state.defaultColValues];
  if (values.every(elem => dataTypes.canCoerce[type](elem))) {
    state._table[idx].type = type;
  } else {
    const notCoercable = values.some(elem => !dataTypes.canCoerce[type](elem));
    throw new Error(`column at idx ${idx} can't be coerced to type '${type}' as the following elements aren't coercable: ${notCoercable.join(', ')}`);
  }
};

tableLib.renameColIdx = (state, idx, value) => {
  console.log('idx', idx, 'val', value)
  console.log(state._table[idx][state.defaultColKey])
  state._table[idx][state.defaultColKey] = value;
};

tableLib.setColAtInd = (state, column, ind, value) => {
  const idx = tableLib.findColumnId(state, column);
  return tableLib.setColIdxAtInd(state, idx, ind, value);
};

tableLib.setColIdxAtInd = (state, idx, ind, value) => {
  state._table[idx][state.defaultColValues][ind] = value;
  tableLib.populateNulls(state);
  //return {[idx]: tableLib.returnEntry(state, state._table[idx][state.defaultColKey], state._table[idx][state.defaultColValues])};
};

tableLib.deleteColumn = (state, column) => {
  //note that this will delete from the front if there are duplicate keys.
  const idx = tableLib.findColumnId(state, column);
  tableLib.deleteColumnIdx(state, idx);
};

tableLib.deleteColumnIdx = (state, idx) => {
  const temp = state._table[idx];
  if (!temp.fixed) {
    for (let i = idx; i < Object.keys(state._table).length; i++) {
      state._table[idx] = state._table[idx + 1];
    }
    delete state._table[state.colsLen - 1];
    tableLib.increment(state, 'colsLen', -1);
  }
  //delete state._table[idx];
  
  //return temp;
};

tableLib.deleteRow = (state, idx) => {
  const output = Object.keys(state._table).map(column => {
    const out = state._table[column][state.defaultColValues].splice(idx, 1);
    return {[state._table[column][state.defaultColKey]]: out[0]};
  });
  tableLib.increment(state, 'rowsLen', -1);
  // return output.reduce((acc,val) => {
  //   acc = {...acc, ...val};
  //   return acc;
  // }, {});
};

// react side methods
tableLib.hasColumn = (state, column) => {
  for (let i = 0; i < state.colsLen; i++) {
    if (state._table[i][state.defaultColKey] === column) return true;
  }
  return false;
};

tableLib.getColumn = (state, column) => {
  const id = tableLib.findColumnId(state, column);
  return tableLib.getColumnIdx(state, id);
};

tableLib.getColumnIdx = (state, idx) => {
  return state._table[idx];
};

tableLib.getColAtInd = (state, column, ind) => {
  const col = tableLib.getColumn(state, column);
  return col[state.defaultColValues][ind];
};

tableLib.getColIdxAtInd = (state, idx, ind) => {
  const col = tableLib.getColumnIdx(idx);
  return col[state.defaultColValues][ind];
};

// tableLib.logState = function(state, ...rest) {
//   console.log('State:', state);
//   console.log('rest:', rest.join(', '));

// };

// tableLib.logThis = function () {
//   console.log('this', this);
// };

// tableLib.bindState = function(state) {
//   const funcs = Object.keys(tableLib).filter(elem => elem !== 'bindState');
//   for (let i = 0; i < funcs.length; i++) {
//     const funcKey = funcs[i];
//     const funcDef = tableLib[funcKey];
//     tableLib[funcKey] = (...args) => funcDef(state, ...args); 
//   }
//   console.log('Binding complete!');
// };

//action creator for datatypes TextArea

const textAreaUpdate = createAction('plans/setColIdxAtInd');




export default tableLib;