/*
  Warnings:

  - Added the required column `languages` to the `userFeeds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userFeeds" (
    "user_id" TEXT NOT NULL,
    "feed_name" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "languages" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "feed_name")
);
INSERT INTO "new_userFeeds" ("categories", "feed_name", "user_id") SELECT "categories", "feed_name", "user_id" FROM "userFeeds";
DROP TABLE "userFeeds";
ALTER TABLE "new_userFeeds" RENAME TO "userFeeds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
