import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: [true, "Please provide an feedback message."],
    }
  },
  { timestamps: true }
)

const FeedbackModel = mongoose.models.feedbacks || mongoose.model("feedback", feedbackSchema)

export default FeedbackModel
