"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { createUser } from "@/server/actions/users";

export default function UserForm() {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const newUser = await createUser(formData as User);
      setStatusMessage(`Success! User ${newUser.email} has been created.`);
      setFormData({ email: "", name: "" });
    } catch (err) {
      setStatusMessage(`Failed: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Add New User</h2>

      <form onSubmit={handleFormSubmission}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email Address (required):</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Full Name (optional):</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#ccc" : "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </form>

      {statusMessage && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: statusMessage.includes("Success")
              ? "#d4edda"
              : "#f8d7da",
            color: statusMessage.includes("Success") ? "#155724" : "#721c24",
            borderRadius: "4px",
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
