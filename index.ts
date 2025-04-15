
import express from 'express';
import { initialiseDatabase } from './dbconfig/db.config.js';
import { initAuthRouter } from './routes/auth.routes.js';

const app = express();
const dataSource = await initialiseDatabase();

app.use(express.json());

app.use('/auth',initAuthRouter(dataSource))

const port = 3000

app.listen(port, async() => {
  console.log('Server running on',port);
});
