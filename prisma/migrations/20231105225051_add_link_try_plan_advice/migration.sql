-- CreateTable
CREATE TABLE `lnk_trt_plan_advice` (
    `lnk_id` INTEGER NOT NULL AUTO_INCREMENT,
    `treatment_plan_id` INTEGER NOT NULL,
    `advice_id` INTEGER NOT NULL,
    `advice_type` ENUM('nonpharm', 'pharm') NOT NULL,
    `advice_order` TINYINT NULL,

    PRIMARY KEY (`lnk_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
