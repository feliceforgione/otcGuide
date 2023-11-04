-- DropForeignKey
ALTER TABLE `exclusion_questions` DROP FOREIGN KEY `exclusion_questions_disease_subclass_id_fkey`;

-- AlterTable
ALTER TABLE `exclusion_questions` MODIFY `disease_subclass_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `exclusion_questions` ADD CONSTRAINT `exclusion_questions_disease_subclass_id_fkey` FOREIGN KEY (`disease_subclass_id`) REFERENCES `disease_subclass`(`disease_subclass_id`) ON DELETE SET NULL ON UPDATE CASCADE;
