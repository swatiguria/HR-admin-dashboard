import express from "express";
import {
  addPolicy,
  editPolicy,
  deletePolicy,
  showPolicy,
} from "../controllers/policyController.js";
import { uploadFile } from "../utils/storage.js";

const policyRouter = express.Router();

policyRouter.post("/add-policy", uploadFile, addPolicy);
policyRouter.patch("/edit-policy/:id",uploadFile, editPolicy);
policyRouter.delete("/delete-policy/:id", deletePolicy);
policyRouter.get("/all", showPolicy);

export default policyRouter;
