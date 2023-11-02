
import express from 'express';
import planController from './controllers/planController.js';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const planRouter = express.Router();


app.use('/plans', planRouter);

planRouter.get('/all',
  planController.getAllPlans,
  (req, res) => {
    res.status(200).json(res.locals.plans);
  });

planRouter.post('/new',
  planController.createNewPlan,
  (req, res) => {
    res.status(200).json(res.locals.newPlan);
  });

planRouter.get('/:id',
  planController.getPlanById,
  (req, res) => {
    res.status(200).json(res.locals.results);
  });

planRouter.patch('/:id',
  planController.updatePlanById,
  (req, res) => {
    res.status(200).json(res.locals.results);
  });

planRouter.delete('/:id',
  planController.deletePlanById,
  (req, res) => {
    res.status(200).json(res.locals.results);
  });


app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;
