/*
  Warnings:

  - A unique constraint covering the columns `[tracker]` on the table `PixelTracker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PixelTracker_tracker_key" ON "PixelTracker"("tracker");
