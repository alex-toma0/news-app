/*
  Warnings:

  - You are about to drop the column `categories` on the `UserFavorites` table. All the data in the column will be lost.
  - Added the required column `category` to the `UserFavorites` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFavorites" (
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "uploadDate" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "url"),
    CONSTRAINT "UserFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserFavorites" ("image", "source", "title", "uploadDate", "url", "userId") SELECT "image", "source", "title", "uploadDate", "url", "userId" FROM "UserFavorites";
DROP TABLE "UserFavorites";
ALTER TABLE "new_UserFavorites" RENAME TO "UserFavorites";
PRAGMA foreign_key_check("UserFavorites");
PRAGMA foreign_keys=ON;
