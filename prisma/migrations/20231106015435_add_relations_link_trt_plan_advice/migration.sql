-- AddForeignKey
ALTER TABLE `lnk_trt_plan_advice` ADD CONSTRAINT `lnk_trt_plan_advice_treatment_plan_id_fkey` FOREIGN KEY (`treatment_plan_id`) REFERENCES `treatment_plan`(`treatment_plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lnk_trt_plan_advice` ADD CONSTRAINT `lnk_trt_plan_advice_advice_id_fkey` FOREIGN KEY (`advice_id`) REFERENCES `treatment_advice`(`advice_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
