import React from 'react';
import './stylesheets/styles.scss';

const App = props => {
  return (
    <div id="container">
      <div className="nav"></div>
      <div className="sidebar"></div>
      <div className="tabview">
        <div className="tabview-tabs"></div>
        <div className="tabview-content"></div>
      </div>
    </div>
  );
};


export default App;