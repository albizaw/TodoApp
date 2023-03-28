import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router/routes.js';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const port = 8000;

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
});

// http get request
app.get('/', (req, res) => {
  res.status(201).json('Home GET');
});

app.use('/', router);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
});
