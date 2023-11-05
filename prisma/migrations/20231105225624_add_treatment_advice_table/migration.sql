-- CreateTable
CREATE TABLE `treatment_advice` (
    `advice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease_subclass_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `text` LONGTEXT NOT NULL,
    `list` MEDIUMTEXT NULL,

    PRIMARY KEY (`advice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
