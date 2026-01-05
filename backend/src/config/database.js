const mongoose = require("mongoose");
require("dotenv").config();

console.log("check", process.env.NODE_ENV);

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      console.log("Using existing MongoDB connection");
      return;
    }

    const isDev = process.env.NODE_ENV === "development";

    const options = {
      maxPoolSize: isDev ? 10 : 50,
    };

    if (isDev) {
      mongoose.set("debug", true);
    }

    try {
      await mongoose.connect(process.env.MONGO_URI, options);
      this.isConnected = true;
      console.log("Mongo connected");
    } catch (error) {
      console.error("Mongo connection failed");
      throw error;
    }
  }
}

module.exports = new Database();
