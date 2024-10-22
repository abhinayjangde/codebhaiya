import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author: { type: String, required: true },
    metades: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    tags: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://codebhaiya.s3.ap-south-1.amazonaws.com/blogs/df.jpeg",
    },
    video: { type: String, default: "null" },
    category: { type: String, required: true },
    readingTime: { type: String },
  },
  { timestamps: true }
)

const BlogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema)
export default BlogModel
