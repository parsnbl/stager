import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../stylesheets/Plan.module.scss';
import DateTime from '../../lib/DateTime';
import DetailCell from '../components/DetailCell.jsx';
import ToggleRowsCols from './ToggleRowsCols.jsx';

import {
  pushToColumn,
  pushColumn,
  deleteRow,
  deleteColumnIdx,

} from '../reducers/planSlice.js';

import tableLib , { dataTypes } from '../../lib/tableLib';

const Plan = (props) => {
  const data = useSelector((state) => state.plan);
  const dispatch = useDispatch();

  // console.log(data._table[1].values)
  // console.log(data._table[2].values)
  const daysInCal = new DateTime(data.earliestDate).makeTimezoneAware().getDaysFrom(new DateTime(data.latestDate)) + 1;
  console.log(daysInCal)

  //colsLen
  //rowsLen

  const produceColumns = () => {
    const detailCols = 'min-content '.repeat(data.colsLen - 1).trimEnd();
    const calendarcolumns = 'minmax(30px, 1fr) '.repeat(daysInCal).trimEnd();
    return [
      '[plan-start detail-start]',
      detailCols,
      '[detail-end date-start]',
      calendarcolumns,
      '[date-end plan-end]',
    ].join(' ');
  };

  const produceDateHeaders = () => {
    
  }
  // const rows = '[header-start]  20px [header-end table-start] 1fr 1fr 1fr 1fr 1fr';

  
  const produceRows = () => {
    const headerRows = ['39px'];
    const tableRows = '39px '.repeat(data.rowsLen).trimEnd();
    return [
      '[header-start]',
      ...headerRows,
      '[header-end table-start]',
      tableRows,
      '[table-end]'
    ].join(' ');
  };

  
  const addRow = () => {
    console.log('Add Row occured!');
    dispatch(
      pushToColumn({
        column: 'Row Label',
        value: null,
      })
    );
  };

  const addColumn = () => {
    console.log('Add Column occured!');
    dispatch(
      pushColumn({
        column: '',
        values: new Array(data.rowsLen).fill(''),
        type: dataTypes.TEXT,
        fixed: false,
      })
    );
  };

  const removeRow = () => {
    console.log('Delete Row occured!');
    dispatch(deleteRow({idx: data.rowsLen - 1}));
  };

  const removeColumn = () => {
    console.log('Delete Column occured!');
    dispatch(deleteColumnIdx({idx: data.colsLen - 1}));
  };

  //takes the array and the header
  const buildColumn = (arr, columnInd, headerName, type) => {
    const column = [];
    column.push(
      <DetailCell
        key={`${columnInd}_header`}
        value={headerName}
        row="1/span 1"
        column={`${columnInd}/span 1`}
        header={true}
        type={type}
      />
    );
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      column.push(
        <DetailCell
          value={value}
          type={type}
          key={`${columnInd}_${i}`}
          row={`${i + 2}/span 1`}
          column={`${columnInd}/span 1`}
        />
      );
    }
    //console.log('col', column)
    return column;
  };

  const buildTable = (data) => {
    let tableOutput = [];
    let firstColumn = [];
    for (let i = 0; i < data.colsLen; i++) {
      const { column, values, type } = tableLib.getColumnIdx(data, i); //table.getColumnIdx(i);
      //console.log(column, values, type)
      const temp = buildColumn(values, i, column, type);
      if (i === 0) {
        firstColumn = [...temp];
      } else {
        tableOutput = [...tableOutput, ...temp];
      }
    }
    const len = data.colsLen;
    firstColumn.push(
      
    );
    tableOutput.push(
      
    );
    //console.log(tableOutput)
    return [firstColumn, tableOutput];
  };

  const [firstColumn, tableColumns] = buildTable(data);

  const rows = produceRows();
  const columns = produceColumns();
  //console.log(rows)
  return (
    <div className={styles.plan_container}>
      <div className={styles.plan_details}>
        <h1>PLAN</h1>
        <div className={styles.plan_details_toolbar}>
          <ToggleRowsCols
            key={crypto.randomUUID()} 
            toggleAddHandler={addRow}
            toggleSubHandler={removeRow}
            size = {14}
            location = {'rows'}
          />
          <ToggleRowsCols
            key={crypto.randomUUID()}
            toggleAddHandler={addColumn}
            toggleSubHandler={removeColumn}
            size = {14}
            location = {'cols'}
          />
        </div>
      </div>
      <div className={styles.tables_wrapper}>
        <div
          className={styles.plan_column_one}
          style={{ gridTemplateRows: rows }}
        >
          {firstColumn}
        </div>
        <div
          className={styles.plan_table}
          style={{
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
          }}
        >
          {tableColumns}

          {/*
          <div className={styles.plan_detail_cell} style={{
            gridRow: '2', backgroundColor: 'lightblue', 
            gridColumn: '4 / span 2',
            borderRadius: '5px',
            
            padding: '0px'
          }}></div>
          <div className={styles.plan_detail_cell} style={{
            gridRow: '3', backgroundColor: 'lightgreen', 
            gridColumn: '6 / span 3',
            borderRadius: '5px',
            border: '0px',
            padding: '0px'
          }}></div>
          <div className={styles.plan_detail_cell} style={{
            gridRow: '4', backgroundColor: 'purple', 
            gridColumn: '8 / span 2',
            borderRadius: '5px',
            border: '0px',
            padding: '0px'
          }}></div>
          <div className={styles.plan_detail_cell} style={{
            gridRow: '5', backgroundColor: 'salmon', 
            gridColumn: '5 / span 2',
            borderRadius: '5px',
            border: '0px',
            padding: '0px'
          }}></div>
          <div className={styles.plan_detail_cell} style={{
            gridRow: '6', backgroundColor: 'orange', 
            gridColumn: '5 / span 5',
            borderRadius: '5px',
            border: '0px',
            padding: '0px'
          }}></div>
         */}
        </div>
      </div>
    </div>
  );
};

export default Plan;
