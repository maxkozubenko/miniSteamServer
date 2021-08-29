const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

const authRouter = require('./controllers/authController');
const gamesController = require('./controllers/gamesController');
const userController = require('./controllers/userController');
const {authMiddleware} = require('./middlewares/authMiddleware');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(__dirname + '/dist/MiniSteamCICDApp'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/MiniSteamCICDApp/indexedDB.html'));
});

app.use('/api/auth', authRouter);
app.use('/api', [authMiddleware], gamesController);
app.use('/api', [authMiddleware], userController);

const start = async () => {
    try {
      await mongoose.connect('mongodb+srv://uberTruck:uberTruck@cluster0.qsokx.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-bnw047-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
        useNewUrlParser: true, useUnifiedTopology: true,
      });
  
      app.listen(port);
    } catch (err) {
      console.log(`Error on server startup: ${err.message}`);
    }
};

start();