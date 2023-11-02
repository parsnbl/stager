import { PlanModel } from "../models/planModels.js";
import { dataTypes } from "../../lib/tableLib.js";
import { CONSTS } from "../../lib/DateTime.js"; 

/*
{planName: 'Untitled',
  planDescription: '',
  rowsLen: 0,
  colsLen: 0,
  earliestDate: new Date().toISOString().slice(0,10),
  latestDate: new Date().toISOString().slice(0,10),
  defaultEmpty: null,
  defaultColKey: 'column',
  defaultColValues: 'values',
  dayView: 'DAILY',}
*/
const emptyPlan = {
  planName: 'Untitled',
  planDescription: '',
  rowsLen: 0,
  colsLen: 0,
  earliestDate: new Date().toISOString().slice(0,10),
  latestDate: new Date().toISOString().slice(0,10),
  defaultEmpty: null,
  defaultColKey: 'column',
  defaultColValues: 'values',
  dayView: CONSTS.DAILY,
  _table: {
    0: {
      column: 'Row Label',
      values: [],
      type: dataTypes.const.TEXT,
      fixed: true,
    },
    1: {
      column: 'Start Date',
      values: [],
      type: dataTypes.const.DATE,
      fixed: true,
    },
    2: {
      column: 'Due Date',
      values: [],
      type: dataTypes.const.DATE,
      fixed: true,
    },
    3: {
      column: 'Status',
      values: [],
      type: dataTypes.const.BUTTON,
      fixed: true,
    },
    4: {
      column: 'Color',
      values: [],
      type: dataTypes.const.COLOR,
      fixed: true,
    },
  }
};


const planController = {};


planController.getAllPlans = (req, res, next) => {
  PlanModel.find()
    .then(data =>{
      res.locals.plans = data;
      return next();
    })
    .catch(err => next({
      log: `planController.getAllPlans: error occured retrieving plans: ${JSON.stringify(err)}`,
      code: 500,
      message: {err: 'planController.getAllPlans: error occured retrieving plans.'}
    }));
};

planController.createNewPlan = (req, res, next) => {
  PlanModel.create(emptyPlan)
    .then(data => {
      res.locals.newPlan = data;
      return next();
    })
    .catch(err => next({
      log: `planController.createNewPlan: error occured creating plan: ${JSON.stringify(err)}`,
      code: 500,
      message: {err: 'planController.createNewPlan: error occured creating plan.'}
    }));
};

planController.getPlanById = (req, res, next) => {
  const { id } = req.body;
  if (id === undefined) {
    return next({
      log: `planController.getPlanById: provided id was undefined.`,
      code: 400,
      message: {err: 'planController.getPlanById: Bad request.'}});
  }
  PlanModel.findById(id).exec()
    .then(data =>{
      if (data === null) {
        return next({
          log: `planController.getPlanById: unable to find plan id ${id}.`,
          code: 404,
          message: {err: 'planController.getPlanById: unable to find plan id.'}
        });
      }
      res.locals.results = data;
      return next();
    })
    .catch(err =>  next({
      log: `planController.getPlanById: error occured getting plan with id ${id}:${JSON.stringify(err)}`,
      code: 500,
      message: {err: 'planController.getPlanById: Error occured retrieving plan.'
      }}));

};

planController.updatePlanById = async (req, res, next) => {
  const { id, value } = req.body;
  if (id === undefined) {
    return next({
      log: `planController.updatePlanById: provided id was undefined.`,
      code: 400,
      message: {err: 'planController.updatePlanById: Bad request.'}});
  }
  if (typeof value !== 'object') {
    return next({
      log: `planController.updatePlanById: provided value was not an object.`,
      code: 400,
      message: {err: 'planController.updatePlanById: Bad request.'}});
  }
  try {
    const doc = await PlanModel.findById(id).exec();
    if (doc === null) {
      return next({
        log: `planController.updatePlanById: unable to find plan id ${id}.`,
        code: 404,
        message: {err: 'planController.updatePlanById: unable to find plan id.'}
      });
    }
    //update all keys with new values
    for (let key in doc) {
      if (value[key] !== undefined) {
        doc[key] = value[key];
      }
    }
    await doc.save();
    res.locals.results = doc;
    return next();
  } catch(err) {
    return next({
      log: `planController.updatePlanById: error occured getting plan with id ${id}:${JSON.stringify(err)}`,
      code: 500,
      message: {err: 'planController.updatePlanById: Error occured retrieving plan.'
      }});
  }
};

planController.deletePlanById = async (req, res, next) => {
  const { id, value } = req.body;
  if (id === undefined) {
    return next({
      log: `planController.deletePlanById: provided id was undefined.`,
      code: 400,
      message: {err: 'planController.deletePlanById: Bad request.'}});
  }
  if (typeof value !== 'object') {
    return next({
      log: `planController.deletePlanById: provided value was not an object.`,
      code: 400,
      message: {err: 'planController.deletePlanById: Bad request.'}});
  }
  try {
    const doc = await PlanModel.findByIdAndDelete(id).exec();
    if (doc === null) {
      return next({
        log: `planController.deletePlanById: unable to find plan id ${id}.`,
        code: 404,
        message: {err: 'planController.deletePlanById: unable to find plan id.'}
      });
    }
    res.locals.results = doc;
    return next();
  } catch(err) {
    return next({
      log: `planController.deletePlanById: error occured getting plan with id ${id}:${JSON.stringify(err)}`,
      code: 500,
      message: {err: 'planController.deletePlanById: Error occured retrieving plan.'
      }});
  }
};

export default planController;