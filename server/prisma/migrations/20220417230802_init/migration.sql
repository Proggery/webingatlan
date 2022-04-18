-- AlterTable
ALTER TABLE `account` MODIFY `password` VARCHAR(64) NULL;

-- CreateTable
CREATE TABLE `portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NULL,
    `box_title` VARCHAR(255) NULL,
    `text` VARCHAR(255) NULL,
    `img_name` VARCHAR(45) NULL,
    `img_alt` VARCHAR(45) NULL,
    `icon_class` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
