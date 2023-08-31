/*
  Warnings:

  - You are about to drop the column `format` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Image` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "format",
DROP COLUMN "publicId",
DROP COLUMN "version",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "Table1" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Table1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table2" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Table2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Table1ToTable2" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Table1ToTable2_AB_unique" ON "_Table1ToTable2"("A", "B");

-- CreateIndex
CREATE INDEX "_Table1ToTable2_B_index" ON "_Table1ToTable2"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Table1ToTable2" ADD CONSTRAINT "_Table1ToTable2_A_fkey" FOREIGN KEY ("A") REFERENCES "Table1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Table1ToTable2" ADD CONSTRAINT "_Table1ToTable2_B_fkey" FOREIGN KEY ("B") REFERENCES "Table2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
