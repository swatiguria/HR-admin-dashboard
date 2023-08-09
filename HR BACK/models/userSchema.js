import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    employeeID: {
      type: String,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    dateOfBirth: {
      type: String,
    },
    marital: {
      type: String,
    },
    about: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    reportsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    teamMates: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    hasResigned: {
      type: Boolean,
      default: false,
    },
    education: [
      {
        university: {
          type: String,
        },
        degree: {
          type: String,
        },
        field: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    workExperience: [
      {
        title: {
          type: String,
        },
        employmentType: {
          type: String,
        },
        companyName: {
          type: String,
        },
        location: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        description: {
          type: String,
        },
        designation: {
          type: String,
        },
        industry: {
          type: String,
        },
      },
    ],
    allotedLeaves: {
      type: Number,
      default: 20,
    },
    remainingLeaves: {
      type: Number,
      default: 20,
    },
    leaveByCategory: [
      {
        leaveType: String,
        allotedLeaves: Number,
        remainingLeaves: Number,
      },
    ],
    role: {
      type: Array,
      default: ["employee"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
