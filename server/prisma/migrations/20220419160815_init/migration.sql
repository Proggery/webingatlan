-- CreateTable
CREATE TABLE `about` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `text` VARCHAR(500) NULL,
    `text2` VARCHAR(500) NULL,
    `img_name` VARCHAR(255) NULL,
    `img_alt` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `about_listing` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(64) NULL,
    `username` VARCHAR(255) NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `company` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slider` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,
    `img_name` VARCHAR(255) NULL,
    `img_alt` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,
    `box_title` VARCHAR(255) NULL,
    `text` VARCHAR(255) NULL,
    `img_name` VARCHAR(255) NULL,
    `img_alt` VARCHAR(255) NULL,
    `icon_class` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolio` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,
    `text` VARCHAR(255) NULL,
    `icon_class` VARCHAR(255) NULL,
    `img_name` VARCHAR(255) NULL,
    `img_alt` VARCHAR(255) NULL,
    `category_name` VARCHAR(255) NULL,
    `category_ID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
