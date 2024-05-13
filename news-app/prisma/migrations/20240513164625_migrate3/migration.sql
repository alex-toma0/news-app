/*
  Warnings:

  - The primary key for the `userFeeds` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userFeeds" (
    "user_id" TEXT NOT NULL,
    "feed_name" TEXT NOT NULL,
    "categories" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "feed_name")
);
INSERT INTO "new_userFeeds" ("categories", "feed_name", "user_id") SELECT "categories", "feed_name", "user_id" FROM "userFeeds";
DROP TABLE "userFeeds";
ALTER TABLE "new_userFeeds" RENAME TO "userFeeds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
