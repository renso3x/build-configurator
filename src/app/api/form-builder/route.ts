import { NextRequest, NextResponse } from "next/server";
import {
  createFormBuilder,
  getAllSectionsWithSpecs,
} from "@/actions/form-builder";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createFormBuilder(body);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to process request",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await getAllSectionsWithSpecs();

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to fetch data",
      },
      { status: 500 }
    );
  }
}
