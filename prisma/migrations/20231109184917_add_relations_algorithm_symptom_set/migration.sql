-- AddForeignKey
ALTER TABLE `algorithm_symptom_set` ADD CONSTRAINT `algorithm_symptom_set_symptom_id_fkey` FOREIGN KEY (`symptom_id`) REFERENCES `symptoms`(`symptom_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `algorithm_symptom_set` ADD CONSTRAINT `algorithm_symptom_set_symptom_type_id_fkey` FOREIGN KEY (`symptom_type_id`) REFERENCES `symptom_types`(`symptom_type_id`) ON DELETE SET NULL ON UPDATE CASCADE;
