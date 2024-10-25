-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "titleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "devices" TEXT[],
    "displayImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "currentAchievements" INTEGER NOT NULL,
    "totalAchievements" INTEGER NOT NULL,
    "currentGamerscore" INTEGER NOT NULL,
    "totalGamerscore" INTEGER NOT NULL,
    "progressPercentage" INTEGER NOT NULL,
    "latTimePlayed" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_titleId_key" ON "Game"("titleId");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_userId_gameId_key" ON "Achievement"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
