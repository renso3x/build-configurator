import { NextResponse } from "next/server";
import { clearTestData } from "@/lib/database-utils";

export async function DELETE() {
  try {
    const result = await clearTestData();
    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Clear operation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
