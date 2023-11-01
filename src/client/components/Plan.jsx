import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Icons from 'react-feather';
import styles from '../stylesheets/Plan.module.scss';
import HeaderCell from '../components/HeaderCell.jsx';
import DetailCell from '../components/DetailCell.jsx';
import AddButton from '../components/AddRowButton.jsx';
import { pushToColumn, pushColumn, deleteRow, deleteColumnIdx, setColIdxAtInd } from '../reducers/planSlice.js';
import { CONSTS } from '../../lib/DateTime';
import Table from '../../lib/Table';
import tableLib from  '../../lib/TableRedux';



const Plan = props => {
  const data = useSelector((state) => state.plan);
  const dispatch = useDispatch();

  
  const produceColumns = () => {
    const detailCols = '1fr '.repeat(data.colsLen - 1).trimEnd();
    const calendarcolumns = ['1fr', '1fr', '1fr', '1fr', '1fr', '1fr'];
    return ['[plan-start detail-start]', detailCols, '[detail-end date-start]',...calendarcolumns, '[date-end plan-end]'].join(' ');
  };

  // const rows = '[header-start]  20px [header-end table-start] 1fr 1fr 1fr 1fr 1fr';
  
  const headerRows = ['20px'];
  const lastRow = ['30px'];
  const produceRows = () => {
    const tableRows = '1fr '.repeat(data.rowsLen).trimEnd(); 
    return ['[header-start]', ...headerRows, '[header-end table-start]', tableRows, '[table-end add-row-start]', ...lastRow, '[add-row-end]'].join(' ');
  };

  const addRow = () => {
    console.log('Add Row occured!');
    dispatch(pushToColumn({
      column: 'Row Label',
      value: null
    }));
  };

  const addColumn = () => {
    console.log('Add Column occured!');
    dispatch(pushColumn({
      column: null,
      values: new Array(data.numRows).fill(null)
    }));
  };

  //takes the array and the header
  const buildColumn = (arr, columnInd, headerName = 'Row Label') => {
    const column = [];
    column.push(<HeaderCell 
      key={crypto.randomUUID()}
      text={headerName}
      row = '1/span 1'
      column = {`${columnInd}/span 1`}
    />);
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      column.push(
        <DetailCell text={value}
          key={crypto.randomUUID()}
          row={`${i + 2}/span 1`}
          column= {`${columnInd}/span 1`}
          
        />
      );
    }
    return column;
  };
  
  const buildTable = (data) => {

    let tableOutput = [];
    let firstColumn = [];
    for (let i = 0; i < data.colsLen; i++){
      
      const {column, values} = tableLib.getColumnIdx(data, i);//table.getColumnIdx(i);
      console.log(column, values)
      const temp = buildColumn(values, i, column);
      if (i === 0) {
        firstColumn = [...temp];
      } else {
        tableOutput = [...tableOutput, ...temp];
      }
    }
    const len = data.colsLen;
    firstColumn.push(<AddButton key={crypto.randomUUID()} clickHandler={addRow}/>);
    tableOutput.push(<AddButton key={crypto.randomUUID()} column={{len}} clickHandler={addColumn}/>);
    //console.log(tableOutput)
    return [firstColumn, tableOutput];
  };

  const [firstColumn, tableColumns] = buildTable(data);
  

 

  const rows = produceRows();
  const columns = produceColumns();

  

  return (
    <div className={styles.plan_container}>
      <div className={styles.plan_details}>
        <h1>PLAN</h1>
      </div>
      <div className={styles.tables_wrapper}>
        <div className={styles.plan_column_one}
          style={{gridTemplateRows: rows}}>
          {firstColumn}
          
        </div>
        <div className={styles.plan_table}
          style={{gridTemplateColumns:columns, gridTemplateRows: rows}}>
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

