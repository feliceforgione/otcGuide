-- AddForeignKey
ALTER TABLE `lnk_ingredient_filter_questions` ADD CONSTRAINT `lnk_ingredient_filter_questions_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`ingredient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lnk_ingredient_filter_questions` ADD CONSTRAINT `lnk_ingredient_filter_questions_filter_question_id_fkey` FOREIGN KEY (`filter_question_id`) REFERENCES `filter_questions`(`filter_question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
