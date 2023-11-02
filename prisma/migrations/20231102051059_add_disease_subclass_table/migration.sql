-- CreateTable
CREATE TABLE `disease_subclass` (
    `disease_subclass_id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease_subclass_name` VARCHAR(255) NOT NULL,
    `disease_subclass_synonyms` VARCHAR(255) NULL,
    `disease_subclass_description` MEDIUMTEXT NULL,
    `disease_subclass_order` TINYINT NULL,
    `disease_subclass_disable` BOOLEAN NOT NULL DEFAULT false,
    `disease_subclass_overview` MEDIUMTEXT NULL,
    `nonpharm` MEDIUMTEXT NULL,
    `disease_class_id` INTEGER NOT NULL,

    PRIMARY KEY (`disease_subclass_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `disease_subclass` ADD CONSTRAINT `disease_subclass_disease_class_id_fkey` FOREIGN KEY (`disease_class_id`) REFERENCES `disease_class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
