"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type TestResult = {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
};

export default function TestPage() {
  const [results, setResults] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testDatabaseConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/test-db");
      const result = await response.json();
      setResults(result);
    } catch {
      setResults({ success: false, error: "Failed to connect to API" });
    } finally {
      setIsLoading(false);
    }
  };

  const seedTestData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/test-db/seed", { method: "POST" });
      const result = await response.json();
      setResults(result);
    } catch {
      setResults({ success: false, error: "Failed to seed data" });
    } finally {
      setIsLoading(false);
    }
  };

  const clearTestData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/test-db/clear", { method: "DELETE" });
      const result = await response.json();
      setResults(result);
    } catch {
      setResults({ success: false, error: "Failed to clear data" });
    } finally {
      setIsLoading(false);
    }
  };

  const testFormBuilder = async () => {
    setIsLoading(true);
    try {
      // Test data that matches FormFields type
      const testFormData = [
        {
          section: { name: "Test Section 1" },
          specifications: [
            { name: "Test Spec 1", price: 100 },
            { name: "Test Spec 2", price: 200 }
          ]
        },
        {
          section: { name: "Test Section 2" },
          specifications: [
            { name: "Test Spec 3", price: 300 }
          ]
        }
      ];

      const response = await fetch("/api/form-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testFormData)
      });
      const result = await response.json();
      setResults(result);
    } catch {
      setResults({ success: false, error: "Failed to test form builder" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/form-builder");
      const result = await response.json();
      setResults(result);
    } catch {
      setResults({ success: false, error: "Failed to fetch data" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>🧪 Database & Form Builder Testing</CardTitle>
          <CardDescription>
            Test database connections and form builder functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              onClick={testDatabaseConnection} 
              disabled={isLoading}
              variant="outline"
            >
              Test DB Connection
            </Button>
            
            <Button 
              onClick={seedTestData} 
              disabled={isLoading}
              variant="outline"
            >
              Seed Test Data
            </Button>
            
            <Button 
              onClick={clearTestData} 
              disabled={isLoading}
              variant="destructive"
            >
              Clear Test Data
            </Button>
            
            <Button 
              onClick={testFormBuilder} 
              disabled={isLoading}
              variant="default"
            >
              Test Form Builder
            </Button>
            
            <Button 
              onClick={fetchAllData} 
              disabled={isLoading}
              variant="secondary"
            >
              Fetch All Data
            </Button>
          </div>
          
          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Processing...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className={results.success ? "text-green-600" : "text-red-600"}>
              {results.success ? "✅ Success" : "❌ Error"}
            </CardTitle>
            <CardDescription>
              {results.message || "Operation completed"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto max-h-96">
              {JSON.stringify(results, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
