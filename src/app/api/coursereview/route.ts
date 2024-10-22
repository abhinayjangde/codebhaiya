//api/coursealert/route.js

import { NextResponse } from "next/server";
import db from "@/lib/db";
import CourseReview from "@/models/CourseReview";


export const POST = async (request: Request) =>{
    await db();
    try {
        const body = await request.text()
        const {name,email,message,courseName} = await JSON.parse(body)
        let reviewMessage = new CourseReview({name:name,email:email, message: message, coursename: courseName})
        await reviewMessage.save()
        return NextResponse.json({"success":true,"msg":"Review message send successfully"})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({"success":false,"msg":"Review message not send successfully"})
    }
}


