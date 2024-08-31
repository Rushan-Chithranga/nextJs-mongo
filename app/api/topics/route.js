import connectMongodb from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  try {
    await connectMongodb();
    await Topic.create({ title, description });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongodb();
    const topics = await Topic.find();
    return NextResponse.json({ topics }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to get topics" },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectMongodb();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic Deleted"  }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to Delete topics" },
      { status: 500 }
    );
  }
}


