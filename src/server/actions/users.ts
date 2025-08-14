"use server";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function createUser({ email, name }: Partial<User>) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}
