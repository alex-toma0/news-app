/*
  Warnings:

  - You are about to drop the `UserFeeds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserFeeds";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "userFeeds" (
    "user_id" INTEGER NOT NULL,
    "feed_name" TEXT NOT NULL,
    "categories" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "feed_name")
);
