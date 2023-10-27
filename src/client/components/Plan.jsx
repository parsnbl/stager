import React, { useEffect } from 'react';
import styles from '../stylesheets/Plan.module.scss';

const Plan = props => {
  
  const columns = '[plan-left] 1fr 1fr 1fr 1fr repeat(6, 1fr) [plan-right]';
  const rows = '[header-start]  20px [header-end] auto';
  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  return (
    <div className={styles.plan_container}>
      <div className={styles.plan_details}>
        <h1>PLAN</h1>
      </div>
      <div className={styles.tables_wrapper}>
        <div className={styles.plan_column_one}
          style={{gridTemplateRows: rows}}
        >
          <div>Row Label</div>
          <div>Try to do something cool</div>
          <div>Try to do something cool</div>
          <div>Try to do something cool</div>
          <div>Try to do something cool</div>
          <div>Try to do something cool</div>
        </div>
        <div className={styles.plan_table}
          style={{gridTemplateColumns: columns}}
        >
          
          <div className={styles.plan_header_cell}>Start Date</div>
          <div className={styles.plan_header_cell}>Due Date</div>
          <div className={styles.plan_header_cell}>Status</div>
          <div className={styles.plan_header_cell}>Week 1</div>
          <div className={styles.plan_header_cell}>Week 2</div>
          <div className={styles.plan_header_cell}>Week 3</div>
          <div className={styles.plan_header_cell}>Week 4</div>
          <div className={styles.plan_header_cell}>Week 5</div>
          <div className={styles.plan_header_cell}>Week 6</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '2'}}>
            10/11/2023
          </div>
          <div className={styles.plan_detail_cell} style={{gridRow: '2'}}>10/31/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '2'}}>In Progress</div>
         
          <div className={styles.plan_detail_cell} style={{gridRow: '3'}}>10/20/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '3'}}>10/31/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '3'}}>In Progress</div>
          
          <div className={styles.plan_detail_cell} style={{gridRow: '4'}}>10/20/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '4'}}>10/31/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '4'}}>In Progress</div>
          
          <div className={styles.plan_detail_cell} style={{gridRow: '5'}}>10/20/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '5'}}>10/31/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '5'}}>In Progress</div>
          
          <div className={styles.plan_detail_cell} style={{gridRow: '6'}}>10/20/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '6'}}>10/31/2023</div>
          <div className={styles.plan_detail_cell} style={{gridRow: '6'}}>In Progress</div>
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
        </div>
      </div>
    </div>
  );
};


export default Plan;

