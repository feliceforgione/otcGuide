-- CreateTable
CREATE TABLE `lnk_trt_plan_upc` (
    `lnk_id` INTEGER NOT NULL AUTO_INCREMENT,
    `upc` VARCHAR(25) NOT NULL,
    `treatment_line` SMALLINT NOT NULL DEFAULT 1,
    `upc_order` TINYINT UNSIGNED NULL,
    `treatment_plan_id` INTEGER NULL,

    PRIMARY KEY (`lnk_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lnk_trt_plan_upc` ADD CONSTRAINT `lnk_trt_plan_upc_treatment_plan_id_fkey` FOREIGN KEY (`treatment_plan_id`) REFERENCES `treatment_plan`(`treatment_plan_id`) ON DELETE SET NULL ON UPDATE CASCADE;
