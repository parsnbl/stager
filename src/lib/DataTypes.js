import React from 'react';
import DateTime from './DateTime.js';
import TextButton from '../client/components/TextButton.jsx';
import TextArea from '../client/components/TextArea.jsx';

const dataTypes = {}

dataTypes.const = Object.freeze({
  RAW: 'RAW',
  TEXT: 'TEXT',
  DATE: 'DATE',
  BUTTON: 'BUTTON',
  LIST: 'LIST',
  EMPTY: 'EMPTY'
});

dataTypes.canCoerce = {
  RAW: (value) => true,
  TEXT: (value) => {
    try {
      const temp = String(value);
      return true;
    } catch(err) {
      return false;
    }
  },
  DATE: (value) => {
    try {
      const temp = new DateTime(value);
      return true;
    } catch(err) {
      return false;
    }
  },
  BUTTON: (value) => dataTypes.canCoerce.TEXT(value),
  LIST: (value) => {false}, // need to implement
  EMPTY: (value) => true,
};

dataTypes.reactComponent = {
  RAW: (value) => value,
  TEXT: (value) => <TextArea text={String(value)} />,
  DATE: (value) => {
    try {
      return new DateTime(value)
        .makeTimezoneAware()
        .toLocaleString('en-us', {month: '2-digit', day:'2-digit', year: 'numeric'});
    } catch(err) {
      console.log('err: ', err, 'value:', value)
    }
    
  },
  BUTTON: (value) => <TextButton text={value} />,
  LIST: (value) => null,
  EMPTY: (value) => null,
};


export default dataTypes;