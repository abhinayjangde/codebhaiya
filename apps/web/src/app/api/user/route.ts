import { NextResponse } from "next/server"
import db from "@/db"

export const GET = async (req: Request, res: Response) => {
    try {
        const users = await db.user.findMany()
        return NextResponse.json(users)
    } catch (error:any) {
        return NextResponse.json({ error: error.message })
    }
}