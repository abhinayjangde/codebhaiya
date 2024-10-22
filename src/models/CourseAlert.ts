import mongoose from "mongoose"

const courseAlertSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      lowercase: true,
    },
    coursename: {
      type: String
    },
  },
  { timestamps: true }
)

const CourseAlert = mongoose.models.coursealerts || mongoose.model("coursealert", courseAlertSchema)

export default CourseAlert
