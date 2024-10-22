import mongoose, { Schema, Document } from "mongoose"

export interface User extends Document {
  fullname: string
  username: string
  email: string
  password: string
  verifyCode: string
  verifyCodeExpiry: Date
  isVerified: boolean
  avatar: string
  cover: string
  role: string
  phone: string
  dob: string
  country: string
  city: string
}

const userSchema: Schema<User> = new Schema(
  {
    fullname: { type: String, default: "null" },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email."],
    },
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: { type: String, required: [true, "Verify Code is required"] },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code Expiry is required"],
    },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "https://codebhaiya.s3.ap-south-1.amazonaws.com/images/avatar.png" },
    cover: { type: String, default: null },
    role: { type: String, enum: ["USER", "ADMIN", "CREATOR"], default: "USER" },
    phone: { type: String, default: null },
    dob: { type: String, default: null },
    country: { type: String },
    city: { type: String },
  },
  { timestamps: true }
)

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema)

export default UserModel
