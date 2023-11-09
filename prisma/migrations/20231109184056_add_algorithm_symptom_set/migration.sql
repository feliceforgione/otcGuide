-- CreateTable
CREATE TABLE `algorithm_symptom_set` (
    `algorithm_symptom_set_id` INTEGER NOT NULL AUTO_INCREMENT,
    `algorithm_question_id` INTEGER NOT NULL,
    `symptom_id` INTEGER NOT NULL,
    `symptom_type_id` INTEGER NULL,

    PRIMARY KEY (`algorithm_symptom_set_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
