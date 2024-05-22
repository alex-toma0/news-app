-- CreateTable
CREATE TABLE "userFavorites" (
    "user_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "uploadDate" DATETIME NOT NULL,

    PRIMARY KEY ("user_id", "url")
);
