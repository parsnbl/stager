import React, { useEffect, useState } from 'react';
import styles from '../stylesheets/Plan.module.scss';

import HeaderCell from '../components/HeaderCell.jsx';
import DetailCell from '../components/DetailCell.jsx';
import AddButton from '../components/AddRowButton.jsx';
import { CONSTS } from '../../lib/DateTime';
import * as Icons from 'react-feather';

const Plan = props => {
  
  const data = {
    numCols: 4,
    numRows: 5,
    dayView: CONSTS.DAILY,
    table: [
      ['Row Label', ['Try to do something cool', 'Try to do something cool', 'Try to do something cool', 'Try to do something cool', 'Try to do something cool']],
      ['Start Date', ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', ]],
      ['End Date', ['2023-10-15', '2023-10-16', '2023-10-17', '2023-10-18', '2023-10-19',]],
      ['Status', ['In Progress', 'In Progress', 'In Progress', 'In Progress', 'In Progress']],
    ]
  };

  const brokenTable = [
    ['Row Label', ['Try', null, null,]],
    ['Start Date', ['2023-10-01', null,null, ]],
    ['End Date', ['2023-10-15', null,]],
    ['Status', ['In Progress', null,null,]],
  ];

  const data_2 = {
    numCols: 4,
    numRows: 5,
    dayView: CONSTS.DAILY,
    table: {
      0:  ['Row Label', ['Try to do something cool', 'Try to do something cool', 'Try to do something cool', 'Try to do something cool', 'Try to do something cool']],
      1: ['Start Date', ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', ]],
      2: ['End Date', ['2023-10-15', '2023-10-16', '2023-10-17', '2023-10-18', '2023-10-19',]],
      3: ['Status', ['In Progress', 'In Progress', 'In Progress', 'In Progress', 'In Progress']],
    }
  };
  const [planState, setPlanState ] = useState(data);
  const dataMap = new Map(planState.table);


  const produceColumns = () => {
    const detailCols = '1fr '.repeat(planState.numCols - 1).trimEnd()
    const calendarcolumns = ['1fr', '1fr', '1fr', '1fr', '1fr', '1fr'];
    return ['[plan-start detail-start]', detailCols, '[detail-end date-start]',...calendarcolumns, '[date-end plan-end]'].join(' ');
  };

  // const rows = '[header-start]  20px [header-end table-start] 1fr 1fr 1fr 1fr 1fr';
  
  const headerRows = ['20px'];
  const lastRow = ['30px'];
  const produceRows = () => {
    const tableRows = '1fr '.repeat(planState.numRows).trimEnd(); 
    return ['[header-start]', ...headerRows, '[header-end table-start]', tableRows, '[table-end add-row-start]', ...lastRow, '[add-row-end]'].join(' ');
  };

  const addRow = () => {
    console.log('Add Row occured!');
    const newState = {...planState, numRows: planState.numRows += 1};
    newState.table.map(column => column[1].push(null));
    setPlanState(newState);
    console.log(newState);
  };

  const addColumn = () => {
    console.log('Add Column occured!');
    const newState = {...planState, numCols: planState.numCols += 1};
    newState.table.push([null, new Array(planState.numRows).fill(null)]);
    setPlanState(newState);
    console.log(newState);
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
  
  const buildTable = (dataMap) => {
    const keys = Array.from(dataMap.keys());
    console.log(dataMap.keys())
    let tableOutput = [];
    let firstColumn = [];
    for (let i = 0; i < keys.length; i++){
      const key = keys[i];
      console.log(key, i);
      const temp = buildColumn(dataMap.get(key), i, key);
      if (i === 0) {
        firstColumn = [...temp];
      } else {
        tableOutput = [...tableOutput, ...temp];
      }
    }
    let len = keys.length;
    firstColumn.push(<AddButton key={crypto.randomUUID()} clickHandler={addRow}/>);
    tableOutput.push(<AddButton column={{len}} clickHandler={addColumn}/>);
    console.log(tableOutput)
    return [firstColumn, tableOutput];
  };
  const [firstColumn, tableColumns] = buildTable(dataMap);
  

 

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

