import React from 'react';
import * as Icons from 'react-feather';

const IconButton = ({ icon, clickHandler }) => {
  const DynamicIcon = `Icons.${icon}`;
  return(
    <DynamicIcon 
    onClick={()=> clickHandler()}
    />
  );
}

export default IconButton;