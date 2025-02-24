import connectDB from "@/libs/db";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.judul || !body.deskripsi || !body.status) {
        return NextResponse.json({ "message": "All fields are required" }, { status: 400 })
    }
    try {
        await connectDB();
        const data = await Task.create(body);
        return NextResponse.json({ message: "Task created successfully", data }, { status: 200 })
    } catch (error) {
        console.log(error);
    }
}


export async function GET() {
    try {
        await connectDB();
        const data = await Task.find();
        return NextResponse.json({ message: "Task fetched successfully", data }, { status: 200 })
    } catch (error) {

    }
}
