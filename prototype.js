const newTest = [
  ['Row Label', ['Try', null, null,]],
  ['Start Date', ['2023-10-01', null,null, ]],
  ['End Date', ['2023-10-15', null,null,]],
  ['Status', ['In Progress', null,null,]],
];

let indexWereChecking = 2;
newTest.every(column=> column[1][indexWereChecking] === null);
newTest.map(column => column[1].splice(indexWereChecking, 1));