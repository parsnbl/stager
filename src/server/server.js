import path from 'path';
import express from 'express';


const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const planRouter = express.Router();


app.use('/plans', planRouter);

planRouter.get('/all', 
  (req, res) =>{

  });

planRouter.post('/new', (req, res) => {});

planRouter.get('/:planid', (req, res) => {});

planRouter.patch('/:planid', (req, res) => {});

planRouter.del('/:planid', (req, res) => {});


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
