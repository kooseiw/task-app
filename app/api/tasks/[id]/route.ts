import connectDB from "@/libs/db";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        await connectDB();
        const data = await Task.findById(id);
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { judulBaru: judul, deskripsiBaru: deskripsi, statusBaru: status } = await request.json();

    try {
        await connectDB();
        await Task.findByIdAndUpdate(id, { judul, deskripsi, status });
        return NextResponse.json({ message: "Task updated successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        await connectDB();
        await Task.findByIdAndDelete(id);
        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}

