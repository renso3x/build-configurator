"use server";

import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export async function createUser({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  try {
    await prisma.user.create({
      data: {
        email: email,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
