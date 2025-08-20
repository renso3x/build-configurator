"use server";

import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { UserCreate } from "@/types/prisma";

export async function createUser(data: UserCreate) {
  try {
    await prisma.user.create({ data });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
