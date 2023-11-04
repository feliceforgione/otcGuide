-- CreateTable
CREATE TABLE `exclusion_questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(255) NOT NULL,
    `disease_subclass_id` INTEGER NOT NULL,

    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exclusion_questions` ADD CONSTRAINT `exclusion_questions_disease_subclass_id_fkey` FOREIGN KEY (`disease_subclass_id`) REFERENCES `disease_subclass`(`disease_subclass_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
