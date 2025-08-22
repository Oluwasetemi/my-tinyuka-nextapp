import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: "Hello World", body });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: "Hello World", body });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: "Hello World", body });
}
