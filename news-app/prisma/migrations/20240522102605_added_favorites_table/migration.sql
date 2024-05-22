-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_userFavorites" (
    "user_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT,
    "uploadDate" DATETIME NOT NULL,

    PRIMARY KEY ("user_id", "url")
);
INSERT INTO "new_userFavorites" ("image", "source", "title", "uploadDate", "url", "user_id") SELECT "image", "source", "title", "uploadDate", "url", "user_id" FROM "userFavorites";
DROP TABLE "userFavorites";
ALTER TABLE "new_userFavorites" RENAME TO "userFavorites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
