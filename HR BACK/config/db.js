import mongoose from "mongoose";
import { dbData } from "../config.js";

const url = `mongodb+srv://${dbData.username}:${dbData.pass}@cluster0.sxavqzw.mongodb.net/${dbData.dbName}?retryWrites=true&w=majority`;

export default async function mongodbConnection() {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((error) => {
      console.log(`Error while connecting to DB: ${error.message}`);
    });
}
