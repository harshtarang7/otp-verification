
import express from 'express';
import { initialiseDatabase } from './dbconfig/db.config.js';

const app = express();

app.get('/', (req, res) => {
  res.send('OTP Verification App');
});

const port = 3000

app.listen(port, async() => {
    await initialiseDatabase();
  console.log('Server running on',port);
});
