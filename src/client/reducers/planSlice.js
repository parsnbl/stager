import { createSlice } from '@reduxjs/toolkit';
import { CONSTS } from '../../lib/DateTime.js';
import tableLib, { dataTypes } from '../../lib/tableLib.js';

const initialState = {
  dayView: CONSTS.DAILY,
  planName: 'Launch an App!',
  planDescription: 'Build a cool app for people to enjoy.',
  rowsLen: 5,
  colsLen: 5,
  earliestDate: '2023-10-01',
  latestDate: '2023-10-19',
  defaultEmpty: null,
  defaultColKey: 'column',
  defaultColValues: 'values',
  _table: {
    0: {
      column: 'Row Label',
      values: [
        'Try to do something cool',
        'Try to do something cool',
        'Try to do something cool',
        'Try to do something cool',
        'Try to do something cool',
      ],
      type: dataTypes.const.TEXT,
      fixed: true,
    },
    1: {
      column: 'Start Date',
      values: [
        '2023-10-01',
        '2023-10-02',
        '2023-10-03',
        '2023-10-04',
        '2023-10-05',
      ],
      type: dataTypes.const.DATE,
      fixed: true,
    },
    2: {
      column: 'Due Date',
      values: [
        '2023-10-15',
        '2023-10-16',
        '2023-10-17',
        '2023-10-18',
        '2023-10-19',
      ],
      type: dataTypes.const.DATE,
      fixed: true,
    },
    3: {
      column: 'Status',
      values: [
        'in_progress',
        'in_progress',
        'in_progress',
        'in_progress',
        'in_progress',
      ],
      type: dataTypes.const.BUTTON,
      fixed: true,
    },
    4: {
      column: 'Color',
      values: [
        'bittersweet',
        'light-green',
        'tropical-indigo',
        'gamboge',
        'celestial-blue',
      ],
      type: dataTypes.const.COLOR,
      fixed: true,
    },
  },
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    pushToColumn(state, action) {
      tableLib.pushToColumn(state, action.payload.column, action.payload.value);
      tableLib.setEarliest(state);
      tableLib.setLatest(state);
    },
    pushColumn(state, action) {
      tableLib.pushColumn(
        state,
        action.payload.column,
        action.payload.values,
        action.payload.type,
        action.payload.fixed
      );
    },
    deleteRow(state, action) {
      tableLib.deleteRow(state, action.payload.idx);
      tableLib.setEarliest(state);
      tableLib.setLatest(state);
    },
    deleteColumnIdx(state, action) {
      tableLib.deleteColumnIdx(state, action.payload.idx);
    },
    setColIdxAtInd(state, action) {
      tableLib.setColIdxAtInd(
        state,
        action.payload.idx,
        action.payload.ind,
        action.payload.value
      );
      tableLib.setEarliest(state);
      tableLib.setLatest(state);
    },
    renameColIdx(state, action) {
      tableLib.renameColIdx(state, action.payload.idx, action.payload.value);
    },
  },
});

export const getColumnByIdx = (state, idx) => state.plan._table[idx];

const { actions, reducer } = planSlice;
export const {
  pushToColumn,
  pushColumn,
  deleteRow,
  deleteColumnIdx,
  setColIdxAtInd,
  renameColIdx,
} = actions;

export default reducer;
