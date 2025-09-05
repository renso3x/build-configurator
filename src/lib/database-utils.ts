import { prisma } from "@/db/prisma";

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Current user count: ${userCount}`);
    
    return { success: true, message: "Database connection successful" };
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown database error" 
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Seed some initial data for testing
export const seedTestData = async () => {
  try {
    // Check if data already exists
    const existingSections = await prisma.section.count();
    if (existingSections > 0) {
      return { 
        success: true, 
        message: "Test data already exists",
        skipped: true 
      };
    }

    // Create test sections and specifications
    const testData = [
      {
        section: { name: "Chassis" },
        specifications: [
          { name: "Body Color", price: 0 },
          { name: "Wheel Type", price: 500 },
        ]
      },
      {
        section: { name: "Interior" },
        specifications: [
          { name: "Seat Material", price: 200 },
          { name: "Dashboard Color", price: 100 },
        ]
      }
    ];

    const results = [];
    for (const data of testData) {
      const section = await prisma.section.create({
        data: { name: data.section.name }
      });

      const specifications = [];
      for (const spec of data.specifications) {
        const specification = await prisma.specification.create({
          data: {
            name: spec.name,
            price: spec.price,
            sectionId: section.id
          }
        });
        specifications.push(specification);
      }

      results.push({ section, specifications });
    }

    return {
      success: true,
      message: `Successfully seeded ${results.length} sections with specifications`,
      data: results
    };
  } catch (error) {
    console.error("Seeding error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown seeding error"
    };
  }
};

// Clear all test data
export const clearTestData = async () => {
  try {
    // Delete specifications first (foreign key constraint)
    const deletedSpecs = await prisma.specification.deleteMany({});
    
    // Then delete sections
    const deletedSections = await prisma.section.deleteMany({});

    return {
      success: true,
      message: `Cleared ${deletedSpecs.count} specifications and ${deletedSections.count} sections`,
      data: { deletedSpecs: deletedSpecs.count, deletedSections: deletedSections.count }
    };
  } catch (error) {
    console.error("Clear data error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
