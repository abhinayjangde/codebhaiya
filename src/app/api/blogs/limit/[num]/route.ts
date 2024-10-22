//api/blogs/[num]/route.js

import { NextResponse } from "next/server"
import db from "@/lib/db"
import BlogModel from "@/models/Blog"

export const GET = async (request: Request, response: any) => {
  try {
    await db()
    const { num } = response.params
    const limit = parseInt(num, 10)
    const url = request.url
    // Check if the limit is a valid number
    if (isNaN(limit) || limit <= 0) {
      return NextResponse.json({
        success: false,
        msg: "Invalid number parameter",
      })
    }
    if (
      url === `http://localhost:3000/api/blogs/limit/${limit}` ||
      url === `https://codebhaiya.com/api/blogs/limit/${limit}`
    ) {
      const blogs = await BlogModel.find()
        .sort({ date: -1 })
        .select({
          content: 0,
          tags: 0,
          category: 0,
          _id: 0,
          readingTime: 0,
          video: 0,
        })
        .limit(limit)
      return NextResponse.json({ success: true, data: blogs })
    }

    const blogs = await BlogModel.find().sort({ date: -1 })
    return NextResponse.json({ success: true, data: blogs })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ success: false, msg: "Blog not found" })
  }
}
