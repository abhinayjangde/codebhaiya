import { NextResponse } from "next/server"
import db from "@/lib/db"
import BlogModel from "@/models/Blog"
import UserModel from "@/models/User"

const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  const seconds = Math.ceil(minutes * 60);
  const readingTime = {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60
  };
  return readingTime;
}

export const POST = async (request: Request) => {
  try {
    await db()
    const body = await request.text()
    const {
      title,
      metades,
      userId,
      author,
      content,
      tags,
      category,
      image,
      video
    } = await JSON.parse(body)
    const readingTime = calculateReadingTime(content).minutes + " min read"

    const user = await UserModel.findById(userId)
    if (!user) {
      return NextResponse.json({
        success: false,
        msg: "You are not allowed to write blog",
      })
    } else {
      const newslug = title.toLowerCase().replace(/\s+/g, "-")
      let existingSlug = await BlogModel.findOne({ slug: newslug })
      if (!existingSlug) {
        let blog = new BlogModel({
          title: title,
          slug: newslug,
          image: image,
          metades: metades,
          content: content,
          author: author,
          createdBy: userId,
          tags: tags,
          category: category,
          video: video,
          readingTime: readingTime,
        })
        await blog.save()
        return NextResponse.json({
          success: true,
          msg: "Blog added successfully",
        }, { status: 201 })
      } else {
        return NextResponse.json({ success: false, msg: "slug already exists" })
      }
    }
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({
      success: false,
      msg: "Blog not added successfully",
    })
  }
}

export const GET = async (request: Request) => {
  try {
    await db()
    const url = request.url
    // console.log("This is url", url)
    if (
      url === "https://codebhaiya.com/api/blogs"||
      url === "http://localhost:3000/api/blogs" 
    ) {
      const allBlogs = await BlogModel.find().sort({ date: -1 })
      return NextResponse.json({ success: true, data: allBlogs })
    }

    // const blogs = await BlogModel.find().sort({ date: -1 })
    // return NextResponse.json({ success: true, data: "blogs" })
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ success: false, msg: "Blog not found" })
  }
}

// export const PUT = async (request: Request) => {
//     try {
//         await db()
//         const body = await request.text()
//         const { title, slug, content, metades, author, tags, category, image } = await JSON.parse(body)
//         const newslug = slug.toLowerCase().replace(/\s+/g, '-')
//         let existingSlug = await BlogModel.findOne({ slug: newslug })
//         if(existingSlug) {
//             let blog = await BlogModel.findOneAndUpdate({ slug: newslug }, { title: title, content: content, metades: metades, author: author, tags: tags, category: category, image: image }, { new: true })
//             return NextResponse.json({ "success": true, "msg": "Blog updated successfully" })
//         }
//         else{
//             return NextResponse.json({ "success": false, "msg": "Blog not found" })
//         }
//     }
//     catch (error: any) {
//         console.log(error.message)
//         return NextResponse.json({ "success": false, "msg": "Blog not updated successfully" })
//     }
// }

// export const DELETE = async (request: Request) => {
//     try {
//         await db()
//         const body = await request.text()
//         const { slug } = await JSON.parse(body)
//         const newslug = slug.toLowerCase().replace(/\s+/g, '-')
//         let existingSlug = await BlogModel.findOne({ slug: newslug })
//         if(existingSlug) {
//             await BlogModel.deleteOne({ slug: newslug })
//             return NextResponse.json({ "success": true, "msg": "Blog deleted successfully" })
//         }
//         else{
//             return NextResponse.json({ "success": false, "msg": "Blog not found" })
//         }
//     }
//     catch (error: any) {
//         console.log(error.message)
//         return NextResponse.json({ "success": false, "msg": "Blog not deleted successfully" })
//     }
// }
