import mongoose from "mongoose";

const MongoDB_Url = process.env.MONGODB_URL;

let cached = (global as any).mongoose || { conn: null, Promise: null };

export const connectToDB = async () => {


    if (cached.conn) return cached.conn;
    if (!MongoDB_Url) throw new Error('Mongo_Url is missing');

    cached.Promise = cached.Promise || mongoose.connect(MongoDB_Url, {
        dbName: "commerce",
        bufferCommands: false
    });

    cached.conn = await cached.Promise;

    return cached.conn;
}