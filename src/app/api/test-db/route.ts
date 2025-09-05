import { NextResponse } from "next/server";
import { testDatabaseConnection } from "@/lib/database-utils";

export async function GET() {
  try {
    const result = await testDatabaseConnection();
    return NextResponse.json(result, { 
      status: result.success ? 200 : 500 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: "API route error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
