// api/(user)/login/route.ts

import { NextRequest,NextResponse } from "next/server"
import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const POST = async (request: NextRequest) => {
    try {
        await db();
        const reqBody = await request.json()
        const {email,password} = reqBody
        
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exists."},{status:400})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error: "Check your credentials."},{status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1d'})
        const response = NextResponse.json({
            message:"Logged in success",
            success:true,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            role: user.role,
            isVerified: user.isVerified,
            id: user._id,
            fullname: user.fullname,
            userToken: token
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}