-- CreateTable
CREATE TABLE `treatment_plan` (
    `treatment_plan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease_subclass_id` INTEGER NOT NULL,
    `plan_name` VARCHAR(255) NOT NULL DEFAULT '',
    `txt_nonpharm` MEDIUMTEXT NULL,
    `txt_pharm` MEDIUMTEXT NULL,
    `tabs_num` SMALLINT NOT NULL DEFAULT 0,
    `tab3_label` VARCHAR(30) NULL,
    `tab4_label` VARCHAR(30) NULL,
    `tab5_label` VARCHAR(30) NULL,

    PRIMARY KEY (`treatment_plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
