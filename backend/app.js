//External Module
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//local Module
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRoute');
const candidateRouter = require('./routes/candidateRoute');
const authRouter = require('./routes/authRoute');

const app = express();

app.use(
  cors({
    origin: process.env.Client_URL, // ✅ your frontend URL
    credentials: true, // ✅ required for cookies
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_DB_URL = process.env.MONGO_URI;

app.use(authRouter);
app.use(userRouter);
app.use('/candidate', candidateRouter);

const Port = process.env.port || 3003;
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(Port, () => {
      console.log(`server run on address http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log('Error while connecting to MongoDB', err);
  });
