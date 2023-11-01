import { createSlice } from '@reduxjs/toolkit';
import { CONSTS } from '../../lib/DateTime.js';
import tableLib, { dataTypes } from '../../lib/TableLib.js';

const initialState = {
  dayView: CONSTS.DAILY,
  rowsLen: 5,
  colsLen: 4,
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
      column: 'End Date',
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
        'In Progress',
        'In Progress',
        'In Progress',
        'In Progress',
        'In Progress',
      ],
      type: dataTypes.const.BUTTON,
      fixed: true,
    },
  },
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    pushToColumn(state, action) {
      tableLib.pushToColumn(
        state,
        action.payload.column,
        action.payload.value
      )
    },
    pushColumn(state, action) {
      tableLib.pushColumn(
        state,
        action.payload.column,
        action.payload.values,
        action.payload.type,
        action.payload.fixed,
      )
    },
    deleteRow(state, action) {
      tableLib.deleteRow(state, action.payload.idx)
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
    },
    renameColIdx(state, action) {
      tableLib.renameColIdx(state, action.payload.idx, action.payload.value);
    }
  },
})

export const getColumnByIdx = (state, idx) => state.plan._table[idx];

const { actions, reducer } = planSlice;
export const {
  pushToColumn,
  pushColumn,
  deleteRow,
  deleteColumnIdx,
  setColIdxAtInd,
  renameColIdx
} = actions;

export default reducer;
