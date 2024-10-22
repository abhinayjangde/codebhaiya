//api/contact/route.js

import { NextResponse } from "next/server";
import Contact from "@/models/Contact";
import db from "@/lib/db";

export const POST = async (request: Request) =>{
    await db()  
    const body = await request.text()
    const {name,email,message} = await JSON.parse(body)
    let msg = new Contact({name:name,email:email,message:message})
    await msg.save()

    return NextResponse.json({"success":true,"msg":"message send successfully"})
}


