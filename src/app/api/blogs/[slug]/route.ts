import { NextResponse } from "next/server";
import db from "@/lib/db";
import BlogModel from "@/models/Blog";

export const GET = async (request: Request, response: any) => {
    try {
        await db();
        const {slug} = response.params;
        // console.log("slug", slug)
        const blog = await BlogModel.findOne({ slug: slug }).populate("createdBy").exec();
        // console.log("blog by slug", blog)
        return NextResponse.json({ "success": true, "data": blog })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ "success": false, "msg": "blog not found" })
    }
}
