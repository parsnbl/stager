class Table {
  constructor(input) {
    this._table = {};
    this._calcAtrs = ['rowsLen', 'colsLen', 'defaultEmpty', 'keyDefault', 'valuesDefault']; //keep this up to date
    this.rowsLen = 0;
    this.colsLen = 0;
    this.defaultEmpty = null;
    this.keyDefault = 'column';
    this.valuesDefault = 'values';
    if(Array.isArray(input)) {
      this.fromEntries(input);
    } else if (typeof input === 'object'){
      this.fromJSON(input);
    }
  }
  //utilities - reused often
  _returnEntry = (key, values) => {
    return {[this.keyDefault]: key, [this.valuesDefault]: values };
  };

  _increment = (property, val = 1) => {
    if (val + this[property] < 0) {
      this[property] = 0;
    } else {
      this[property] += val;
    }
  };

  _findColumnID = (columnKey) => {
    const output = Object.keys(this._table).find(elem => this._table[elem][this.keyDefault] === columnKey);
    return output !== undefined ? output : -1;
  };

  //utilities - table cleaning
  _populateNulls = () => {
    try{
      for (let i = 0; i < this.colsLen; i++) {
        const column = this._table[i];
        if (column.values.length < this.rowsLen) {
          const delta = this.rowsLen - column.values.length;
          for (let j = 0; j < delta; j++) column.values.push(this.defaultEmpty);
        }
      }
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  _removeNullRows = () => {
    let notFoundNonNullRows = true;
    let rowsRemoved = 0;
    let i = this.rowsLen;
    while (notFoundNonNullRows && i >= 0) {
      if (Object.keys(this._table).every(index => this._table[index][this.valuesDefault][i] === this.defaultEmpty)) {
        Object.keys(this._table).map(index => this._table[index][this.valuesDefault].splice(i, 1));
        i -= 1;
        rowsRemoved += 1;
      } else {
        notFoundNonNullRows = false;
        break;
      }
    }
    this._increment('rowsLen', -rowsRemoved);
    return [rowsRemoved];
  };
 
 

  
  // crud
  pushColumn = (column, values) => {
    if (values !== undefined && !Array.isArray(values)) {
      throw new Error(`Values is not an Array, but type ${typeof values}`);
    }
    try{
      console.log('entry is', this._returnEntry(column, values))
      this._table[this.colsLen] = this._returnEntry(column, values);
      this._increment('colsLen', 1);
      console.log('table is', this._table);
      this._populateNulls();
    } catch (err) {
      console.log(err);
      throw err;
    }
    
    
  };
  pushToColumn = (column, value) => {
    if (this.hasColumn(column)) {
      console.log('Column Found')
      const id = this._findColumnID(column);
      console.log('id is', id)
      this._table[id][this.valuesDefault].push(value);
      console.log('vals array', this._table[id][this.valuesDefault])
      console.log('rowsLen before', this.rowsLen);
      this._increment('rowsLen', 1);
      console.log('rowsLen after', this.rowsLen);
      this._populateNulls();
    } else {
      throw new Error(`Column is not available in table.`)
    }
  };
  hasColumn = (column) => {
    for (let i = 0; i < this.colsLen; i++) {
      if (this._table[i][this.keyDefault] === column) return true;
    }
    return false;
  };

  getColumn = (column) => {
    const id = this._findColumnID(column);
    return this.getColumnIdx(id);
  };

  getColumnIdx = (idx) => {
    return this._table[idx];
  };

  getColAtInd = (column, ind) => {
    const col = this.getColumn(column);
    return col[this.valuesDefault][ind];
  };

  getColIdxAtInd = (idx, ind) => {
    const col = this.getColumnIdx(idx);
    return col[this.valuesDefault][ind];
  };

  setColumn = (column, values) => {
    const id = this._findColumnID(column);
    return this.setColumnIdx(id, values);
  };

  setColumnIdx = (idx, values) => {
    this._table[idx][this.valuesDefault] = values;
    this._populateNulls();
    return {[idx]: this._returnEntry(this._table[idx][this.keyDefault], this._table[idx][this.valuesDefault])};
  };
  setColAtInd = (column, ind, value) => {
    const id = this._findColumnID(column);
    return this.setColIdxAtInd(id, ind, value);
  };
  setColIdxAtInd = (idx, ind, value) => {
    this._table[idx][this.valuesDefault][ind] = value;
    this._populateNulls();
    return {[idx]: this._returnEntry(this._table[idx][this.keyDefault], this._table[idx][this.valuesDefault])};
  };

  deleteColumn = (column) => {
    //note that this will delete from the front if there are duplicate keys.
    const id = this._findColumnID(column);
    return this.deleteColumnIdx(id);
  };

  deleteColumnIdx = (idx) => {
    const temp = this._table[idx];
    //delete this._table[idx];
    for (let i = idx; i < Object.keys(this._table).length; i++) {
      this._table[idx] = this._table[idx + 1];
    }
    delete this._table[this.colsLen - 1];
    this._increment('colsLen', -1);
    return temp;
  };

  deleteRow = (idx) => {
    const output = Object.keys(this._table).map(column => {
      const out = this._table[column][this.valuesDefault].splice(idx, 1);
      return {[this._table[column][this.keyDefault]]: out[0]};
    });
    this._increment('rowsLen', -1);
    return output.reduce((acc,val) => {
      acc = {...acc, ...val};
      return acc;
    }, {});
  };

  clearTable = () => {
    this._table = {};
    this.rowsLen = 0;
    this.colsLen = 0;
    return this;
  };

  keys = () => {
    return Object.keys(this._table).map(column => this._table[column][this.keyDefault]);
  };

  inds = () => {
    return Object.keys(this._table);
  };

  getIndsKeys = () => {
    return Object.keys(this._table).reduce((acc, val)=>{
      acc[val] = this._table[val][this.keyDefault];
      return acc;
    }, {});
  };

  values = () => {
    return Object.keys(this._table).map(column => this._table[column][this.valuesDefault]);
  };

  //creation, serialization methods
  fromJSON = (json) => {
    this.clearTable();    
    try {
      this.rowsLen = json.rowsLen;
      this.colsLen = json.colsLen;
      this.defaultEmpty = json.defaultEmpty;
      this.keyDefault = json.keyDefault;
      this.valuesDefault = json.valuesDefault;
      this._table = json._table;
      this._populateNulls();
      this._removeNullRows();
      return this;
    } catch(err) {
      console.log(err);
      throw err;
    }
  };

  toJSON = () => {
    const output = {
      rowsLen: this.rowsLen,
      colsLen: this.colsLen,
      defaultEmpty: this.defaultEmpty,
      keyDefault: this.keyDefault,
      valuesDefault: this.valuesDefault,
      _table: this._table,
    };
    return output;
  };

  toEntries = () => {
    return Object.values(this._table).map((elem, i) => [`${i}_${elem.column}`, elem.values]);
  };

  fromEntries = (entries) => {
    this.clearTable();
    try {
      entries.map((entry, i)=>{
        this._table[i] = this._returnEntry(entry[0], entry[1]);
        this._increment('colsLen', 1);
        this.rowsLen = Math.max(this.rowsLen, entry[1].length);
      });
      this._populateNulls();
      this._removeNullRows();
      return this;
    } catch(err) {
      console.log(err);
      throw err;
    }
  };
}

/*
{
  rowsLen: 5,
  colsLen: 4,
  defaultEmpty: null,
  keyDefault: 'column',
  valuesDefault: 'values',
  _table: {
    '0': {
      column: 'Row Label',
      values: [
        'Try to do something cool',
        'Try to do something cool',
        'Try to do something cool',
        'Try to do something cool',
        'Try to do something cool'
      ]
    },
    '1': {
      column: 'Start Date',
      values: [
        '2023-10-01',
        '2023-10-02',
        '2023-10-03',
        '2023-10-04',
        '2023-10-05'
      ]
    },
    '2': {
      column: 'End Date',
      values: [
        '2023-10-15',
        '2023-10-16',
        '2023-10-17',
        '2023-10-18',
        '2023-10-19'
      ]
    },
    '3': {
      column: 'Status',
      values: [
        'In Progress',
        'In Progress',
        'In Progress',
        'In Progress',
        'In Progress'
      ]
    }
  }
}
*/

export default Table;