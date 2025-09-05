/*
  Warnings:

  - You are about to drop the `forms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_selections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specification_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."order_selections" DROP CONSTRAINT "order_selections_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order_selections" DROP CONSTRAINT "order_selections_specificationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order_selections" DROP CONSTRAINT "order_selections_specificationItemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_formId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sections" DROP CONSTRAINT "sections_formId_fkey";

-- DropForeignKey
ALTER TABLE "public"."specification_items" DROP CONSTRAINT "specification_items_specificationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."specifications" DROP CONSTRAINT "specifications_sectionId_fkey";

-- DropTable
DROP TABLE "public"."forms";

-- DropTable
DROP TABLE "public"."order_selections";

-- DropTable
DROP TABLE "public"."orders";

-- DropTable
DROP TABLE "public"."sections";

-- DropTable
DROP TABLE "public"."specification_items";

-- DropTable
DROP TABLE "public"."specifications";

-- CreateTable
CREATE TABLE "public"."Section" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Specification" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "sectionId" TEXT,

    CONSTRAINT "Specification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "public"."Section"("name");

-- AddForeignKey
ALTER TABLE "public"."Specification" ADD CONSTRAINT "Specification_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
