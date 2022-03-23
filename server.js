const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 3000;
const MONGODB_URL = 'mongodb://root:root@cluster0-shard-00-00.sf03d.mongodb.net:27017,cluster0-shard-00-01.sf03d.mongodb.net:27017,cluster0-shard-00-02.sf03d.mongodb.net:27017/server-BD?ssl=true&replicaSet=atlas-749k9f-shard-0&authSource=admin&retryWrites=true&w=majority';


var corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRouter);
const start = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT, () => console.log("Server started port: " + PORT));
  } catch (e) {
    console.log(e);
  }
}


start();