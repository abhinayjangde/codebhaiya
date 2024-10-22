//api/coursealert/route.js

import { NextResponse } from "next/server";
import db from "@/lib/db";
import FeedbackModel from "@/models/Feedback";

export const POST = async (request: Request) =>{
    try {
        await db()
        const body = await request.text()
        const {feedback} = await JSON.parse(body)
        let fb = new FeedbackModel({feedback:feedback})
        await fb.save()
        return NextResponse.json({"success":true,"msg":"feedback send successfully"})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({"success":false,"msg":"feedback not send successfully"})
    }
}


