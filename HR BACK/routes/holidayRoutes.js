import express from "express";
import { addHoliday,editHoliday,deleteHoliday,showHolidays } from "../controllers/holidayController.js";

const holidayRouter = express.Router();

holidayRouter.post("/add-holiday", addHoliday);
holidayRouter.patch("/edit-holiday/:id",editHoliday);
holidayRouter.delete("/delete-holiday/:id",deleteHoliday);
holidayRouter.get("/all",showHolidays);

export default holidayRouter;
