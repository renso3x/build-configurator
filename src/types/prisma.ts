import type {
  User as PrismaUser,
  Prisma,
  Specification as PrismaSpecification,
} from "@prisma/client";

export type UserCreate = Prisma.UserCreateInput;
export type User = PrismaUser;
export type Specification = PrismaSpecification;
