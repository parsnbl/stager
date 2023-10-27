import React from 'react';
import '../stylesheets/styles.scss';
import * as Icons from 'react-feather';

const Wrapper = (props) => {
  return(
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
          <Icons.Plus className="icons" style={{height: '50%'}}/>
        </div>
        <div className="tabview-content">
          <div className="plan-header-bar">
            <div className="plan-header-header"></div>
            <div className="plan-header-icons icon-bar"></div>
          </div>
        </div>
      </div>
    </div>
)};

export default Wrapper;