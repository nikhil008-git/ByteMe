/*
  Warnings:

  - You are about to drop the column `slug` on the `Snippet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Snippet_slug_key";

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "slug";
