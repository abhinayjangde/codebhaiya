import mongoose from "mongoose"

const courseReviewSchema = new mongoose.Schema(
  { 
    name:{
      type: String,
      required: [true, "Please provide your name"]
    },
    email:{
      type: String,
      required: [true, "Please provide your email"]
    },
    message: {
      type: String,
      required: [true, "Please provide an feedback message"]
    },
    coursename:{
      type: String,
    }
  },
  { timestamps: true }
)

const CourseReview = mongoose.models.coursereviews || mongoose.model("coursereview", courseReviewSchema)

export default CourseReview
