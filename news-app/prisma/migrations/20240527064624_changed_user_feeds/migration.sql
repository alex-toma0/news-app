-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userFeeds" (
    "user_id" TEXT NOT NULL,
    "feed_name" TEXT NOT NULL,
    "categories" TEXT,
    "languages" TEXT,
    "sources" TEXT,

    PRIMARY KEY ("user_id", "feed_name")
);
INSERT INTO "new_userFeeds" ("categories", "feed_name", "languages", "user_id") SELECT "categories", "feed_name", "languages", "user_id" FROM "userFeeds";
DROP TABLE "userFeeds";
ALTER TABLE "new_userFeeds" RENAME TO "userFeeds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
