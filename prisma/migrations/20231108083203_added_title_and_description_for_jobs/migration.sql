/*
  Warnings:

  - Added the required column `description` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Jobs` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
