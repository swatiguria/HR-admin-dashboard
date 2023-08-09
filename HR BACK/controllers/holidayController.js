import holidayModel from "../models/holidaySchema.js";
import { getWeekDay } from "../utils/getDay.js";
import { result } from "../utils/supportModule.js";
//add holiday
export const addHoliday = async (req, res, next) => {
  try {
    const { date, day, occassion } = req.body;
    const holiday = await holidayModel.create({
      date,
      day: getWeekDay(date),
      occassion,
    });
    if (holiday) {
      res.send(result(holiday, 200, "Holiday added successfully", true));
    } else {
      res.send(null, 400, "Error in adding holiday", false);
    }
  } catch (error) {
    next(error);
  }
};

//edit holiday
export const editHoliday = async (req, res, next) => {
  try {
    const { id } = req.params;
    const EditHolidayDetails = await holidayModel.findByIdAndUpdate(
      id,
      req.body
    );
    if (EditHolidayDetails) {
      res.send(result(editHoliday, 200, "Holiday edited successfully", true));
    } else {
      res.send(result(null, 400, "Error in editing holiday", false));
    }
  } catch (error) {
    next(error);
  }
};

//delete holiday

export const deleteHoliday = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteHolidayDetails = await holidayModel.findByIdAndDelete(id);
    if (deleteHolidayDetails) {
      res.send(
        result(deleteHolidayDetails, 200, "Holiday deleted successfully", true)
      );
    } else {
      res.send(result(null, 400, "Error in deleting holiday", false));
    }
  } catch (error) {
    next(error);
  }
};

//show holidays
export const showHolidays = async (req, res, next) => {
  try {
    const showHolidayList = await holidayModel.find({});
    if (showHolidayList) {
      res.send(
        result(
          showHolidayList.sort(function (a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          }),
          200,
          "Holiday displayed successfully",
          true
        )
      );
    } else {
      res.send(result(null, 400, "Error in displaying holiday", false));
    }
  } catch (error) {
    next(error);
  }
};
