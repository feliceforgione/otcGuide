-- CreateTable
CREATE TABLE `symptoms` (
    `symptom_id` INTEGER NOT NULL AUTO_INCREMENT,
    `symptom_name` VARCHAR(60) NOT NULL,
    `symptom_description` VARCHAR(255) NULL,

    PRIMARY KEY (`symptom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
