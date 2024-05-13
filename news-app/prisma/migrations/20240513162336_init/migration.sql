-- CreateTable
CREATE TABLE "UserFeeds" (
    "user_id" INTEGER NOT NULL,
    "feed_name" TEXT NOT NULL,
    "categories" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "feed_name")
);
