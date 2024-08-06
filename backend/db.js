const mongoose = require('mongoose');
require('dotenv').config()

const mongoURL = process.env.MONGO
mongoose.set("strictQuery", false);

async function connecToMongo() {
    await mongoose.connect(mongoURL);
    console.log("successfully connected to mongodb");
  }

module.exports = connecToMongo;