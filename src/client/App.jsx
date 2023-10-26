import React from 'react';
import './stylesheets/styles.scss';
import * as Icons from 'react-feather';

const App = props => {
  return (
    <div id="container">
      <div className="nav">
        <Icons.AlignJustify className="icons"/>
        <Icons.Home className="icons" />

      </div>
      <div className="sidebar"> 
        <div className="file-explorer-icons">
          <Icons.Edit className="icons"/>
          <Icons.Save className="icons"/>
          <Icons.FolderPlus className="icons"/>
          <Icons.BarChart className="icons" style={{rotate: '-90deg'}}/>
          <Icons.Download className="icons"/>
        </div>
      </div>
      <div className="tabview">
        <div className="tabview-tabs">
          <div className="tabview-top-tab"></div>
        </div>
        <div className="tabview-content"></div>
      </div>
    </div>
  );
};


export default App;