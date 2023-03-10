import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const port = 8000;

mongoose.connect('mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
  console.log(`Server is running at ${port}`);
});
