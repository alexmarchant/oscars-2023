/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Winner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Winner_category_key" ON "Winner"("category");
