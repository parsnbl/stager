const tableLib = {};

//lower order functions
tableLib.findColumnId = (state, columnKey) => {
  const output = Object.keys(state._table).find(elem => state._table[elem][state.defaultColKey] === columnKey);
  return output !== undefined ? output : -1;
};

tableLib.increment = (state, property, val = 1) => {
  if (val + state[property] < 0) {
    state[property] = 0;
  } else {
    state[property] += val;
  }
};

tableLib.returnEntry = (state, k, v) => {
  return {[state.defaultColKey]: k, [state.defaultColValues]: v };
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

tableLib.hasColumn = (state, column) => {
  for (let i = 0; i < state.colsLen; i++) {
    if (state._table[i][state.defaultColKey] === column) return true;
  }
  return false;
};

//higher order crud
tableLib.pushColumn = (state, column, values) => {
  try {
    console.log('entry is', tableLib.returnEntry(state, column, values));
    state._table[state.colsLen] = tableLib.returnEntry(state, column, values);
    tableLib.increment(state,'colsLen', 1);
    console.log('table is', state._table);
    tableLib.populateNulls(state);
  } catch(err) {
    console.log(err);
    throw err;
  }
};

tableLib.pushToColumn = (state, column, value) => {
  if (tableLib.hasColumn(state, column)) {
    console.log('Column Found');
    const id = tableLib.findColumnId(state, column);
    console.log('id is', id);
    state._table[id][state.defaultColValues].push(value);
    console.log('vals array', state._table[id][state.defaultColValues]);
    console.log('rowsLen before', state.rowsLen);
    tableLib.increment(state,'rowsLen', 1);
    console.log('rowsLen after', state.rowsLen);
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
  return tableLib.deleteColumnIdx(state, idx);
};

tableLib.deleteColumnIdx = (state, idx) => {
  const temp = state._table[idx];
  //delete state._table[idx];
  for (let i = idx; i < Object.keys(state._table).length; i++) {
    state._table[idx] = state._table[idx + 1];
  }
  delete state._table[this.colsLen - 1];
  tableLib.increment(state, 'colsLen', -1);
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

export default tableLib;