import { NextResponse } from "next/server";
import { seedTestData } from "@/lib/database-utils";

export async function POST() {
  try {
    const result = await seedTestData();
    return NextResponse.json(result, { 
      status: result.success ? 201 : 500 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Seeding failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
