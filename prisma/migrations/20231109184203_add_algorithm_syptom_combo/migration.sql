-- CreateTable
CREATE TABLE `algorithm_symptom_combos` (
    `algorithm_symptom_combo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `algorithm_question_id` INTEGER NOT NULL,
    `combination` VARCHAR(255) NOT NULL,
    `jumpto_algorithm_question_id` INTEGER NOT NULL,

    PRIMARY KEY (`algorithm_symptom_combo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
