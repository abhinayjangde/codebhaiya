// lib/db.js
import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

const db =  async (): Promise<void>=>{
    if(connection.isConnected){
        console.log("Already connected database.")
        return
    }
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("MONGODB_URI is not defined in environment variables.");
        process.exit(1);
    }
    try {
        const conn = await mongoose.connect(mongoUri, {});
        connection.isConnected = conn.connections[0].readyState
        console.log("database connected successfully")
    } catch (error: any) {
        console.log("Database connection failed", error)
        process.exit(1)
    }
}

export default db


