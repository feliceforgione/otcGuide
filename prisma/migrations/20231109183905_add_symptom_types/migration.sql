-- CreateTable
CREATE TABLE `symptom_types` (
    `symptom_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `symptom_type` VARCHAR(60) NOT NULL,
    `symptom_type_description` VARCHAR(250) NULL,

    PRIMARY KEY (`symptom_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
