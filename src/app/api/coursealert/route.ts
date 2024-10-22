//api/coursealert/route.js

import { NextResponse } from "next/server";
import db from "@/lib/db";
import CourseAlert from "@/models/CourseAlert";


export const POST = async (request: Request) =>{
    try{
        await db()
        const body = await request.text()
        const {email,courseName} = await JSON.parse(body)
        let msg = new CourseAlert({email:email,coursename:courseName})
        await msg.save()
        return NextResponse.json({"success":true,"msg":"message send successfully"})
    }
    catch(err:any){
        console.log(err.message)
        return NextResponse.json({"success":false,"msg":"message not send successfully"})
    }
}


