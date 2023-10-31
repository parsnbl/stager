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
    if (val + property < 0) {
      property = 0;
    } else {
      property += val;
    }
  };

  _findColumnID = (columnKey) => {
    const output = Object.keys(this._table).find(elem => this._table[elem][this.keyDefault] === columnKey);
    return output !== undefined ? output : -1;
  };

  //utilities - table cleaning
  _populateNulls = () => {
    for (let i = 0; i < this.colsLen; i++) {
      const column = this._table[i];
      if (column.values.length < this.rowsLen) {
        const delta = this.rowsLen - column.values.length;
        for (let j = 0; j < delta; j++) column.values.push(this.defaultEmpty);
      }
    }
    return;
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
    this._increment(this.rowsLen, -rowsRemoved);
    return [rowsRemoved];
  };
 
 

  
  // crud
  pushColumn = (column, values) => {
    if (values !== undefined && !Array.isArray(values)) {
      throw new Error(`Values is not an Array, but type ${typeof values}`);
    }
    this._table[this.colsLen] = this._returnEntry(column, values);
    this._increment(this.colsLen);
    this._populateNulls();
    
  };
  pushToColumn = (column, value) => {
    if (this.hasColumn(column)) {
      const id = this._findColumnID(column);
      this._table[id][this.valuesDefault].push(value);
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
    return this._table[id];
  };

  getColAtInd = (column, ind) => {
    const col = this.getColumn(column);
    return col[this.valuesDefault][ind];

  };

  deleteColumn = (column) => {
    const id = this._findColumnID(column);
    delete this._table[id];
    this._increment(this.colsLen, -1);

  };

  deleteRow = (rowInd) => {
    const output = Object.keys(this._table).map(column => column.values.splice(rowInd));
    return output.flat();
  };

  clearTable = () => {
    this._table = {};
    this.rowsLen = 0;
    this.colsLen = 0;
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
        this._increment(this.colsLen);
        this.rowsLen = Math.max(this.rowsLen, entry[1].length);
      });
      this._populateNulls();
      this._removeNullRows();
    } catch(err) {
      console.log(err);
      throw err;
    }
  };
}

/*
{
  0:{
    column: string|null
    values: Array[any]
  },
  ...
}


*/