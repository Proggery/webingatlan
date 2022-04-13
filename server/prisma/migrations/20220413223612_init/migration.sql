/*
  Warnings:

  - Added the required column `icon_class` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `services` ADD COLUMN `box_title` VARCHAR(255) NULL,
    ADD COLUMN `icon_class` VARCHAR(255) NOT NULL,
    ADD COLUMN `text` VARCHAR(255) NULL;
