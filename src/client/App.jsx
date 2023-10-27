import React from 'react';
import Wrapper from './components/Wrapper.jsx';
import Plan from './components/Plan.jsx';
import './stylesheets/styles.scss';
import * as Icons from 'react-feather';

const App = props => {
  return (
    //<Wrapper />
    <div className ="proto-wrapper">
      <Plan />
    </div>
  );
};


export default App;