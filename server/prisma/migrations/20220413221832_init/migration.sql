-- AlterTable
ALTER TABLE `about` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `subtitle` VARCHAR(255) NULL,
    MODIFY `text` VARCHAR(500) NULL,
    MODIFY `text2` VARCHAR(500) NULL,
    MODIFY `img_alt` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NULL,
    `img_name` VARCHAR(45) NULL,
    `img_alt` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
