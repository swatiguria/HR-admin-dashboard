import express from "express";
const messageRouter = express.Router();
import { getMessage } from "../controllers/messageController.js";

messageRouter.get("/get-message/:id", getMessage);
export default messageRouter;
