import express from "express";
import env from "dotenv";
import { result } from "./utils/supportModule.js";
// IMPORT DB CONNECTION
import mongodbConnection from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import messageSocket from "./utils/messageSocket.js";

//IMPORT ALL ROUTES
import baseRoutes from "./routes/routes.js";

const app = express();
env.config();

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false, limit: "200kb" }));
app.use(bodyParser.json({ limit: "200kb" }));

// parse json request body
app.use(express.json());
app.use(cors());
app.options("*", cors());

// Mongodb connection
mongodbConnection();
app.use((error, req, res, next) => {
  if (error) {
    res.send(result(null, 500, error.message, false));
  }
});
// HOME ROUTE
app.use("/", baseRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
export const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

messageSocket();
