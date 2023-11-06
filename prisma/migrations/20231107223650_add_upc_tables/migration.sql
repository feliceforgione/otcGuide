-- CreateTable
CREATE TABLE `lnk_ingredient_filter_questions` (
    `lnk_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_id` INTEGER NOT NULL,
    `filter_question_id` INTEGER NOT NULL,

    PRIMARY KEY (`lnk_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `filter_questions` (
    `filter_question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `reasoning` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`filter_question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `upc` (
    `upc_id` INTEGER NOT NULL AUTO_INCREMENT,
    `upc` VARCHAR(25) NOT NULL,
    `asin` VARCHAR(25) NULL,
    `product_line` VARCHAR(255) NOT NULL,
    `item_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `product_details` TINYTEXT NULL,
    `upc_label_unit_dose` VARCHAR(100) NULL,
    `size` FLOAT NULL,
    `size_uom_id` INTEGER NULL,
    `flavor_id` INTEGER NULL,
    `other_info` MEDIUMTEXT NULL,
    `questions` MEDIUMTEXT NULL,
    `num_of_items` SMALLINT NULL,
    `height` SMALLINT NULL,
    `height_units` VARCHAR(200) NULL,
    `length` SMALLINT NULL,
    `length_units` VARCHAR(200) NULL,
    `width` SMALLINT NULL,
    `width_units` VARCHAR(200) NULL,
    `weight` SMALLINT NULL,
    `weight_units` VARCHAR(200) NULL,
    `bkg_highlight` VARCHAR(6) NOT NULL,
    `flag_yellow` TINYINT NOT NULL DEFAULT 0,
    `flag_red` TINYINT NOT NULL DEFAULT 0,
    `product_type_id` INTEGER NULL,
    `brand_id` INTEGER NULL,
    `manufacturer_id` INTEGER NULL,
    `dosage_form_id` INTEGER NULL,
    `route_id` INTEGER NULL,

    UNIQUE INDEX `upc`(`upc`),
    PRIMARY KEY (`upc_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand_composition` (
    `brand_composition_id` INTEGER NOT NULL AUTO_INCREMENT,
    `upc` VARCHAR(25) NULL,
    `ingredient_id` INTEGER NULL,
    `ingredient_use_id` INTEGER NULL,
    `ingredient_type_id` INTEGER NULL,

    PRIMARY KEY (`brand_composition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredients` (
    `ingredient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_strength` FLOAT NULL,
    `ingredient_strength_units_id` INTEGER NULL,
    `ingredient_equivalence` VARCHAR(255) NULL,
    `ingredient_hypoallergenic` TINYINT NOT NULL DEFAULT 0,
    `ingredient_name_id` INTEGER NULL,

    PRIMARY KEY (`ingredient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredient_name` (
    `ingredient_name_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_name` VARCHAR(255) NOT NULL,
    `ingredient_broader_name_id` INTEGER NULL,

    UNIQUE INDEX `ingredient_name`(`ingredient_name`),
    PRIMARY KEY (`ingredient_name_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredient_uses` (
    `ingredient_use_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_use` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ingredient_use`(`ingredient_use`),
    PRIMARY KEY (`ingredient_use_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredient_type` (
    `ingredient_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_type` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ingredient_type`(`ingredient_type`),
    PRIMARY KEY (`ingredient_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lnk_ingredient_medical_condition` (
    `lnk_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient_id` INTEGER NOT NULL,
    `medical_condition_id` INTEGER NOT NULL,

    PRIMARY KEY (`lnk_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_conditions` (
    `medical_condition_id` INTEGER NOT NULL AUTO_INCREMENT,
    `medical_condition` VARCHAR(255) NOT NULL,
    `medical_condition_layman_term` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`medical_condition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `validation_strength_units` (
    `strength_unit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `strength_unit_abbreviation` VARCHAR(25) NOT NULL,
    `strength_unit_description` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `strength_unit_abbreviation`(`strength_unit_abbreviation`, `strength_unit_description`),
    PRIMARY KEY (`strength_unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_type` (
    `product_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `type`(`type`),
    PRIMARY KEY (`product_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `brand_id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `brand_name`(`brand_name`),
    PRIMARY KEY (`brand_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manufacturer` (
    `manufacturer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `manufacturer_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `manufacturer_name`(`manufacturer_name`),
    PRIMARY KEY (`manufacturer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dosage_form` (
    `dosage_form_id` INTEGER NOT NULL AUTO_INCREMENT,
    `dosage_form_class` VARCHAR(255) NOT NULL,
    `dosage_form_term` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`dosage_form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `validation_route` (
    `route_id` INTEGER NOT NULL AUTO_INCREMENT,
    `route_abbreviation` VARCHAR(25) NOT NULL,
    `route_description` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `route_abbreviation`(`route_abbreviation`, `route_description`),
    PRIMARY KEY (`route_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `directions` (
    `direction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `direction_title` VARCHAR(255) NULL,
    `direction_txt` TEXT NULL,
    `direction_list` TEXT NULL,
    `order` TINYINT NULL,
    `upc` VARCHAR(25) NULL,

    PRIMARY KEY (`direction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indications` (
    `indication_id` INTEGER NOT NULL AUTO_INCREMENT,
    `indication_txt` TEXT NOT NULL,
    `indication_list` VARCHAR(255) NULL,
    `order` TINYINT NULL,
    `upc` VARCHAR(25) NULL,

    PRIMARY KEY (`indication_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warnings` (
    `warning_id` INTEGER NOT NULL AUTO_INCREMENT,
    `warning_title` VARCHAR(255) NULL,
    `warning_txt` TEXT NULL,
    `warning_list` TEXT NULL,
    `order` TINYINT NULL,
    `upc` VARCHAR(25) NULL,

    PRIMARY KEY (`warning_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `features` (
    `feature_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ASIN` VARCHAR(25) NULL,
    `feature_txt` VARCHAR(255) NOT NULL,
    `upc` VARCHAR(25) NULL,

    PRIMARY KEY (`feature_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ASIN` VARCHAR(25) NULL,
    `link` VARCHAR(255) NOT NULL,
    `type` ENUM('small', 'medium', 'large') NULL,
    `height` SMALLINT NULL,
    `width` SMALLINT NULL,
    `upc` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `upc` ADD CONSTRAINT `upc_product_type_id_fkey` FOREIGN KEY (`product_type_id`) REFERENCES `product_type`(`product_type_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `upc` ADD CONSTRAINT `upc_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`brand_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `upc` ADD CONSTRAINT `upc_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer`(`manufacturer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `upc` ADD CONSTRAINT `upc_dosage_form_id_fkey` FOREIGN KEY (`dosage_form_id`) REFERENCES `dosage_form`(`dosage_form_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `upc` ADD CONSTRAINT `upc_route_id_fkey` FOREIGN KEY (`route_id`) REFERENCES `validation_route`(`route_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `brand_composition` ADD CONSTRAINT `brand_composition_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `brand_composition` ADD CONSTRAINT `brand_composition_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`ingredient_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `brand_composition` ADD CONSTRAINT `brand_composition_ingredient_use_id_fkey` FOREIGN KEY (`ingredient_use_id`) REFERENCES `ingredient_uses`(`ingredient_use_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `brand_composition` ADD CONSTRAINT `brand_composition_ingredient_type_id_fkey` FOREIGN KEY (`ingredient_type_id`) REFERENCES `ingredient_type`(`ingredient_type_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_ingredient_name_id_fkey` FOREIGN KEY (`ingredient_name_id`) REFERENCES `ingredient_name`(`ingredient_name_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lnk_ingredient_medical_condition` ADD CONSTRAINT `lnk_ingredient_medical_condition_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`ingredient_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lnk_ingredient_medical_condition` ADD CONSTRAINT `lnk_ingredient_medical_condition_medical_condition_id_fkey` FOREIGN KEY (`medical_condition_id`) REFERENCES `medical_conditions`(`medical_condition_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `directions` ADD CONSTRAINT `directions_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `indications` ADD CONSTRAINT `indications_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warnings` ADD CONSTRAINT `warnings_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `features` ADD CONSTRAINT `features_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_upc_fkey` FOREIGN KEY (`upc`) REFERENCES `upc`(`upc`) ON DELETE RESTRICT ON UPDATE CASCADE;
