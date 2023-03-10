-- CreateTable
CREATE TABLE "Winner" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "nominee" TEXT NOT NULL,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);
