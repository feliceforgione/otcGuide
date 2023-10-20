-- CreateTable
CREATE TABLE `disease_class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `aliasname` VARCHAR(100) NULL,
    `description` VARCHAR(255) NULL,
    `buttonimage` VARCHAR(255) NULL,
    `order` TINYINT NULL,
    `show` BOOLEAN NOT NULL DEFAULT false,
    `disable` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `disease_class_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
